import React, { useState } from 'react'
import axios from '../../../utils/axios'
import requests from '../../../utils/requests'
import './login.style.scss'

export const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
       const request = axios.post(requests.login)
    }

    return(
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
            <h3 className='title'>Username</h3>
            <div className='input'>
                <input type='username' className='formInput' placeholder='Username...' onChange={handleUsernameChange} required></input>
            </div>
            <h3 className='title'>Password</h3>
            <div className='input'>
                <input type='password' className='formInput' placeholder='Password...' onChange={handlePasswordChange} required></input>
            </div>
            <button type='submit' className='searchButton'>Login</button>
            </form>
        </div>
    )
}

export default Login