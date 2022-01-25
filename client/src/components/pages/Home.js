import React, { useContext, useEffect } from 'react';
import ContactForm from './../contacts/ContactForm';
import ContactFilter from './../contacts/ContactFilter';
import Contacts from './../contacts/Contacts';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {

    const authContext=useContext(AuthContext);

    useEffect(()=>{
        authContext.loadUser();
        //eslint-disable-next-line
    },[]);

    return(
        <div className="row">
            <div className="col"><ContactForm></ContactForm></div>
            <div className="col">
                <ContactFilter></ContactFilter>
                <Contacts></Contacts>
            </div>
        </div>
    )
}

export default Home;