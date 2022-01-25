import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactReducer = (state, action ) => {
    switch(action.type){

        case GET_CONTACTS:
            return {
                ...state,
                contacts:action.payload,
                loading:false
            };

        case ADD_CONTACT:
            return {
                ...state,
                contacts:[ action.payload,...state.contacts],  //when adding action in startting contact wil be added in front(beg.)
                loading:false
            };

        case UPDATE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.map(contact=>contact._id===action.payload._id?action.payload:contact),
                loading:false
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts:state.contacts.filter(contact=>contact._id!==action.payload),
                loading:false
            };

        case CLEAR_CONTACT:
            return{
                ...state,
                contacts:null,
                filtered:null,
                error:null,
                current:{}
            }

        case SET_CURRENT:
            return {
                ...state,
                current:action.payload
            };

        case CLEAR_CURRENT:
                return {
                    ...state,
                    current:{ }
                };

        case FILTER_CONTACTS:
                let x=state.contacts.filter(contact=>{
                const regex=new RegExp(`${action.payload}`,'gi');
                return contact.name.match(regex) || contact.email.match(regex);
            })
            return{

                ...state,
                filtered:x==={}?null:x
                
            }


        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null
            }

        case CONTACT_ERROR:
            return{
                ...state,
                error:action.payload
            }

        default:
            return state;
            
    }
};

export default ContactReducer;