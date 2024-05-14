import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, setBudget, expenses, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');

    const validation = (val) => {
        if (val === '') {
            return { isValid: false, message: 'Budget cannot be empty' };
        }

        if (!/^\d+$/.test(val)) {
            return { isValid: false, message: 'Budget must be a valid number' };
        }

        const num = parseInt(val, 10);

        const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
        const remainingFunds = budget - totalExpenses;

        if (num < totalExpenses) {
            return { isValid: false, message: `Budget cannot be lower than total expenses: ${currency}${totalExpenses}` };
        }

        if (num > remainingFunds) {
            return { isValid: false, message: `Budget cannot exceed remaining funds: ${currency}${remainingFunds}` };
        }

        if (num < 0 || num > 20000) {
            return { isValid: false, message: `Budget must be between ${currency}0 and ${currency}20,000` };
        }

        return { isValid: true, message: '' };
    };

    const handleBudgetChange = (event) => {
        const val = event.target.value;
        const { isValid, message } = validation(val);

        if (isValid) {
            setError('');
            setNewBudget(val);
            setBudget(parseInt(val, 10));
        } else {
            alert(message);
            setError(message);
            
        }
    };

    return (
        <div className="alert alert-secondary">
            <div className="input-group rounded">
                <div className="input-group-prepend">
                    <span className="input-group-text">Budget: {currency}</span>
                </div>
                <input type="number" className={`form-control ${error ? 'is-invalid' : ''}`} step="10" value={newBudget} onChange={handleBudgetChange} placeholder="Enter your budget" />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

export default Budget;
