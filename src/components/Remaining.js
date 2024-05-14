import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);

    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

    return (
        <div className={`card bg-${alertType.split('-')[1]} text-white`}>
            <div className="card-header text-center">
                <h5>Remaining</h5>
            </div>
            <div className="card-body text-center">
                <span className={`form-control border-0 bg-${alertType.split('-')[1]} text-white`}>{currency}{budget - totalExpenses}</span>
            </div>
        </div>
    );


};
export default Remaining;