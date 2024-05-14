import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    
    const handleBudgetChange = (event) => {
        let val = event.target.value


            setNewBudget(val);

        
    }
    
    return (
        <div className="alert alert-secondary">
            <div className='input-group rounded'>
                <div className="input-group-prepend">
                    <span className="input-group-text">Budget: $</span>
                </div>
                <input type="number" className="form-control" step="10" value={newBudget} onChange={handleBudgetChange}></input>
            </div> 
        </div>
    );
};
export default Budget;