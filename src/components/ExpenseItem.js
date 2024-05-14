import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: -10
        };

        dispatch ({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    return (
        <tr>
        <td>{props.name}</td>
        <td>${props.cost}</td>
        <td><button class="btn btn-success btn-circle rounded-circle" onClick={event=> increaseAllocation(props.name)}><FontAwesomeIcon icon={faChevronUp}/></button></td>
        <td><button class="btn btn-danger btn-circle rounded-circle" onClick={event => decreaseAllocation(props.name)}><FontAwesomeIcon icon={faChevronDown}/></button></td>
        <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;