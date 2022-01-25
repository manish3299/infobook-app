import React,{useContext, useState, useEffect} from 'react'; //use state to add component level state
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Login=(props) => {

    const authContext=  useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {setAlert}=alertContext;

    const {login, error, clearErrors, isAuthenticated}=authContext;

    const [user,setUser]=useState({
        email:'',
        password:''
    });

    const {email, password} = user;

    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/');
        }
        if(error==="Invalid credentials"){
            setAlert(error, 'danger');
            clearErrors();
        }

        //eslint-disable-next-line
    },[error, isAuthenticated, props.history]);

    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }


    const onSubmit = (e)=>{
        e.preventDefault();
        if(email==="" || password===""){
            setAlert("Please enter all fields", "danger");
        }
        else{
            login({
                email,
                password
            })
        }
        
    }

    return (
        <div className="form-container">
            <h1 className="text-center">
                Account<span className="text-danger m-2">Login</span>
            </h1>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={onChange} required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={onChange} required></input>
                </div>

                <input type="submit" value="Login" className="btn btn-dark btn-block"></input>
            </form>
        </div>
    )

}

export default Login;