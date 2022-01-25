import React,{useContext} from 'react';
import ContactContext from './../../context/contact/ContactContext';
import PropTypes from 'prop-types';

const ContactItem = ({contact}) => {

    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent}= contactContext;

    const {_id, name, email, phone, didProjects, workingProjects} = contact;

    const onEdit = () =>{
        setCurrent(contact);
    }

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return(
        <div className="card bg-light m-2 p-2">
            <h4 className="text-dark text-left">
                {name}{' '}
                <span style={{float: 'right'}}
                    className={'display-3 badge '+(workingProjects === 0 ? 'badge-danger' : 'badge-dark')}>Working projects: {workingProjects}
                </span>
            </h4>
            
            <ul className="list" style={{listStyle:'none'}}>

                {email && (<li>
                    <i className="fas fa-envelope-open"></i>{' '}{email}
                </li>)}

                {phone && (<li>
                    <i className="fas fa-phone"></i>{' '}{phone}
                </li>)}

                {didProjects && (<li>
                    <i className="fas fa-book"></i>{' '}{didProjects}
                </li>)}

                

            </ul>

            <p className="mb-2">
                <button className="btn btn-dark btn-sm mr-1" onClick={onEdit}>Edit</button>
                <button className="btn btn-danger btn-sm mr-1" onClick={onDelete}>Delete</button>
            </p>

        </div>
    );

}

ContactItem.propTypes = {
    contact : PropTypes.object.isRequired
}

export default ContactItem;