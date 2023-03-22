import React, { useState } from 'react'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './App.css';


function Login() {

    let navigate = useNavigate();

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [LoginStatus, setLoginStatus] = useState('');

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if(response.data.message) {
                setLoginStatus(response.data.message)
            }else{
                setLoginStatus(response.data[0].username);
                navigate('/app');
            }
        });
    };

    return (
        <>
        <div className='logbar'>
                <h1>Zaloguj się</h1>
                    <label>Nazwa Użytkownika:</label><br/>
                    <input type="text" onChange={(e) => setUsername(e.target.value)}/> <br/>
                    <label>Hasło:</label><br/>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/><br/><br/>
                    <button onClick={login}>Zaloguj</button>
        </div>
        <h1>{LoginStatus}</h1>
        </>
    )
}

export default Login
