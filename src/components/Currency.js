import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const { dispatch } = useContext(AppContext);

    const changeCurrency = (val) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: val,
        })
    }

    return (
        <div className="card text-white" style={{ backgroundColor: 'lightgreen' }}>
            <div className="card-header text-center">
                <h5>Currency</h5>
            </div>
            <div className="card-body">
                <select name="Currency" id="Currency" className="form-control border-0" onChange={event => changeCurrency(event.target.value)} style={{ backgroundColor: 'lightgreen', color: 'white' }}>
                    <option className="text-black" value="$" selected>$ Dollar</option>
                    <option className="text-black" value="£">£ Pound</option>
                    <option className="text-black" value="€">€ Euro</option>
                    <option className="text-black" value="₹">₹ Rupee</option>
                </select>
            </div>
        </div>
    );
};

export default Currency;