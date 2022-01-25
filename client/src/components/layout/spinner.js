import React from 'react';
import spinner from './../layout/spinner.gif';

const Spinner=()=>{
    return(
        <div className="text-center">
            <img src={spinner} alt='loading....' ></img>
        </div>
    );


}

export default Spinner;