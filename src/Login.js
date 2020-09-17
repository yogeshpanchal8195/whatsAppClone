import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { provider ,auth } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

    const [{},dispatch]=useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((data)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:data.user
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="login">
            <div className="login_conatiner">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <h1>Sign in What's App</h1>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
