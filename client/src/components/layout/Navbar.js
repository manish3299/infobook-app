import React,{Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({title, icon}) => {

    const authContext=useContext(AuthContext);
    const contactContext= useContext(ContactContext);

    const {isAuthenticated, user, logout}=authContext;
    const {clearContacts}=contactContext;

    const onLogout=()=>{
        logout();
        clearContacts();
    }

    const authLinks=(
        <Fragment>
            <li className="nav-item">Hello {user&& user.name}</li>
            <li className="nav-item">
                <a  onClick={onLogout} href="#!"><i className="fas fa-sign-out-alt"></i><span className="hide-sm" style={{color:'white'}}>Logout</span></a>
            </li>
        </Fragment>
    );


    const guestLinks=(
        <Fragment>
            <li className="nav-item">
                    <Link to="/register" style={{color:'white'}}>Register</Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" style={{color:'white'}}>Login</Link>
                </li>
        </Fragment>
    );


    return(
        <div className="navbar bg-dark text-light navbar-inverse">
            <div className="container-fluid">
            <h1>
                <i className={icon}></i>  
                {title}
            </h1>

            <ul className=" nav navbar-nav navbar-right">
                {isAuthenticated?authLinks: guestLinks}

                <li className="nav-item">
                    <Link to="/about" style={{color:'white'}}>About</Link>
                </li>

                

            </ul>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon : PropTypes.string,
}

Navbar.defaultProps = {
    title : ' Info Book',
    icon : "fa fa-id-card-alt",
}

export default Navbar;