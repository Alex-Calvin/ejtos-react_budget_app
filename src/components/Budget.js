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
        <div className="card bg-secondary-subtle">
            <div className="card-header text-center text-dark">
                <h5>Budget</h5>
            </div>
            <div className="card-body">
                <div className="form-floating rounded">
                    <label htmlFor='budget' style={{ paddingLeft: '2.5rem', color: 'black' }}>Amount</label>
                    <div className="input-group">
                        <div className="input-group-prepend border-0 rounded-0">
                            <span className="input-group-text bg-secondary-subtle text-dark" style={{ backgroundColor: 'transparent' }}>{currency}</span>
                        </div>
                        <input id='budget' type="number" className={`form-control bg-secondary-subtle text-dark ${error ? 'is-invalid' : ''}`} step="10" value={newBudget} onChange={handleBudgetChange} placeholder="Enter your budget" style={{ paddingLeft: '2.5rem', borderLeft: '0' }} />
                    </div>
                    {error && <div className="invalid-feedback text-dark">{error}</div>}
                </div>
            </div>
        </div>
    );

};

export default Budget;
