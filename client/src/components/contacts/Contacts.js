import React , {Fragment , useContext, useEffect} from 'react';
import ContactContext from './../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/spinner';

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading} = contactContext;
    
    useEffect(()=>{
        getContacts();
        //eslint-disable-next-line
    },[])

    

    if( contacts!==null && contacts.length===0 && !loading){
        return <h4>please add a contact</h4>
    }

    return(
        //  console.log(contacts)
        <Fragment>
            {
                (contacts!==null && !loading) ? 
                    (
                        filtered ?
                            filtered.map(contact => (
                            <ContactItem key={contact._id} contact={contact}></ContactItem>))
                        :
                            contacts.map(contact => (
                            <ContactItem key={contact._id} contact={contact}></ContactItem>))
                            
                        
                           

                            // contacts.map(function(contact){
                            //     return <ContactItem key={contact._id} contact={contact}></ContactItem>
                            // })
                    )
                    : 
                    <Spinner></Spinner>
            }
            
        </Fragment>


        
    )

}

export default Contacts;