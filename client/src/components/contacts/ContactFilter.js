import React, { useContext , useEffect, useRef } from 'react';
import ContactContext from './../../context/contact/ContactContext';

const ContactFilter = () =>{

    const contactContext = useContext(ContactContext);

    const {filterContacts, clearFilter, filtered} = contactContext;

    const text=useRef('');

    useEffect(() =>{
        if(filtered===null){
            text.current.value='';
        }
    });

    const onChange=e=>{
        if(text.current.value!==''){
            filterContacts(e.target.value);
        }
        else{
            clearFilter();
        }
    }

    return(
        <div>
            <input ref={text} type="text" className="form-control m-2" placeholder="filter contacts" onChange={onChange}></input>

        </div>
    )
}

export default ContactFilter;