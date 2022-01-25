import React , {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR ,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT
 } from "./../types";

 const AuthState = props => {

    const initialState = {
        token:localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error:null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //load user (if any user is already logged in)

    const loadUser = async() => {
        //load token into gobal headers
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

        try{
            const res=await axios.get('/api/auth');
            dispatch({
                type:USER_LOADED,
                payload:res.data
            });
        }catch(err){
            dispatch({type:AUTH_ERROR});
        }
    }

    

    //register user

    const register = async formdata=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try{
            const res=await axios.post('/api/users',formdata, config);

            dispatch({
                type:REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();

        }catch(err){
            dispatch({
                type:REGISTER_FAIL,
                payload:err.response.data.msg
            })
        }

        // fetch("/api/auth",{
        //     method:"post",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         formdata
                
        //     })
        // })
        // .then(res=>res.json())
    }


    //login user

    const login = async formdata=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try{
            const res=await axios.post('/api/auth',formdata, config);

            dispatch({
                type:LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
            
        }catch(err){
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.msg
            })
        }
    }


    //logout user

    const logout = () =>{
        dispatch({
            type:LOGOUT
        });
    }


    //clear errors

    const clearErrors = () =>{
        dispatch({type: CLEAR_ERRORS});
    }

    

    return (
        <AuthContext.Provider value={{
             token: state.token,
             isAuthenticated:state.isAuthenticated,
             loading:state.loading,
             user:state.user,
             error:state.error,
             register,
             loadUser,
             login,
             logout,
             clearErrors
             //access from other components
        }}>
            {props.children}    
        </AuthContext.Provider>
    )

 }

 export default AuthState;