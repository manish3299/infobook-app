import React,{useContext, useState, useEffect} from 'react'; //use state to add component level state
import AlertContext from './../../context/alert/AlertContext';
import AuthContext from './../../context/auth/AuthContext';


const Register=(props) => {

    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);

    const {setAlert}=alertContext;

    const {register, error, clearErrors, isAuthenticated}=authContext;

    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/');
        }
        if(error==="user already exists"){
            setAlert(error, 'danger');
            clearErrors();
        }

        //eslint-disable-next-line
    },[error, isAuthenticated, props.history]);

    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name, email, password, password2} = user;

    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }


    const onSubmit = (e)=>{
        e.preventDefault();
        if(name==="" || email==="" || password===""){
            setAlert("Please enter all fields", "danger");
        }
        else if(password !==password2){
            setAlert("Password do not match", "danger");
        }
        else{
            register({
                name,
                email,
                password,
                password2
            })
        }
    }

    return (
        <div className="form-container">
            <h1 className="text-center">
                Account<span className="text-danger m-2">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name" value={name} onChange={onChange} required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={onChange} required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={onChange} minLength="6" required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input className="form-control" type="password" name="password2" value={password2} onChange={onChange} minLength="6" required></input>
                </div>

                <input type="submit" value="Register" className="btn btn-dark btn-block"></input>
                
            </form>
        </div>
    )

}

export default Register;