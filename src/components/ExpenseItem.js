import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

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
        <td>{currency}{props.cost}</td>
        <td><button className='btn btn-success btn-circle rounded-circle' onClick={event=> increaseAllocation(props.name)}><FontAwesomeIcon icon={faChevronUp}/></button></td>
        <td><button className='btn btn-danger btn-circle rounded-circle' onClick={event => decreaseAllocation(props.name)}><FontAwesomeIcon icon={faChevronDown}/></button></td>
        <td><button className='btn btn-circle rounded-circle' onClick={handleDeleteExpense}><FontAwesomeIcon icon={faTrash}/></button></td>
        </tr>
    );
};

export default ExpenseItem;