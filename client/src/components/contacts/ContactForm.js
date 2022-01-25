import React, {useContext, useState, useEffect} from 'react';
import ContactContext from './../../context/contact/ContactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const {addContact, current, clearCurrent, updateContact} = contactContext;

    useEffect(()=>{
        if(current.name){
              //means edit button is clicked
            setContact(current);
        }
        else{
            setContact({
                name:'',
                email:'',
                phone:'',
                didProjects:'',
                workingProjects:'',
            });
        }
    },[contactContext, current]);
    

    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        didProjects:'',
        workingProjects:''
    });

    const {name, email, phone, didProjects, workingProjects} = contact;

    

    const onChange = e => setContact({...contact, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        // contactContext.addContact(contact);
        if(!current.name){
            addContact(contact);
        }
        else{
            updateContact(contact);
        }
        clearAll();
        
    }

    const clearAll=()=>{
        clearCurrent();
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <h2 className="text-dark text-center m-2">{current.name ? 'Edit Contact' : 'Add Contact'}</h2>
                <input
                    className="form-control m-2" 
                    type="text" 
                    placeholder="name" 
                    name="name" 
                    value={name}
                    onChange={onChange}
                />

                <input
                    className="form-control m-2"
                    type="email" 
                    placeholder="email" 
                    name="email"
                    value={email}
                    onChange={onChange}
                />

                <input
                    className="form-control m-2"
                    type="number" 
                    placeholder="phone" 
                    name="phone"
                    value={phone}  
                    onChange={onChange}
                />

                <input
                    className="form-control m-2" 
                    type="number" 
                    placeholder="no of projects completed" 
                    name="didProjects" 
                    value={didProjects}
                    onChange={onChange}
                />

                <input
                    className="form-control m-2" 
                    type="number" 
                    placeholder="no of projects working upon" 
                    name="workingProjects" 
                    value={workingProjects}
                    onChange={onChange}
                />
                

                <div>
                    <input type="submit" value={current.name ? 'Update Contact' : 'Add Contact'} className="btn btn-dark btn-block m-2"></input>
                </div>

                {current.name && 
                    <div>
                        <button className="btn btn-muted btn-block m-2" onClick={clearAll}>Clear All</button>
                    </div>
                }

            </form>
        </div>
    );
}

export default ContactForm;