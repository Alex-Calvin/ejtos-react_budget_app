import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const ExpenseTotal = () => {
    const { expenses, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    return (
        <div className={`card bg-primary text-white`}> 
          <div className="card-header text-center">
            <h5>Spent So Far</h5>
          </div>
          <div className="card-body text-center">
            <span className={`form-control border-0 bg-primary text-white`}>
              {currency}{totalExpenses}
            </span>
          </div>
        </div>
      );
};
export default ExpenseTotal;