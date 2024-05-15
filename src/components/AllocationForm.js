import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllocationForm = (props) => {
    const { dispatch, remaining, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');
    const [modified, setModified] = useState(false);

    const validation = (val) => {
        let isValid = /^\d+$/.test(val);
        return isValid;
    };

    const handleBlur = () => {
        setModified(true);
    };

    const handleChange = (event) => {
        let val = event.target.value;

        if (val === '' || validation(val)) {
            setCost(val);
        }
    };

    const submitEvent = () => {
        if (!validation(cost)) {
            alert("The value is not a valid number.");
            setCost("");
            return;
        }

        if (cost > remaining) {
            alert(`Allocation cannot exceed remaining funds: ${currency}${remaining}`);
            setCost("");
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-12 d-flex">
                    <div className="input-group flex-grow-1 me-2">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                        <select className="form-select rounded-end" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                            <option defaultValue>Choose...</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Finance">Finance</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="input-group flex-grow-1 me-2">
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                        <select className="form-select rounded-end" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                            <option defaultValue value="Add">Add</option>
                            <option value="Reduce">Reduce</option>
                        </select>
                    </div>

                    <div className="input-group flex-grow-1 me-2 position-relative">
                        <label className="input-group-text" htmlFor="cost">{currency}</label>
                        <input required type='number' id='cost' value={cost} className={`form-control rounded-end ${modified && !validation(cost) ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} style={{ position: 'relative' }} />
                        <div className="invalid-feedback" style={{ position: 'absolute', width: '100%', top: '100%', left: '0' }}>Please enter a valid number.</div>
                    </div>

                    <button className="btn btn-primary flex-grow-1" onClick={submitEvent}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
