import React, { useContext } from 'react';
import AlertContext from './../../context/alert/AlertContext';

const Alerts = () => {

    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length>0 && 
        alertContext.alerts.map(alert=>(
            <div key={alert.id} className={`mt-2 alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i>{alert.msg}
            </div>
        ))
    )

}

export default Alerts;