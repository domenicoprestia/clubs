import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser} from '../../../utils/slicers/userSlicer'
import axios from '../../../utils/axios'
import requests from '../../../utils/requests'
import './login.style.scss'
import { Redirect } from 'react-router'

export const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

        document.getElementById('error').textContent = ''     
       const request = await axios.post(requests.login, {username: username, password: password})
       const token = request.data
       const requestUser = await axios.get(requests.userAuth, {headers: {'auth-token': token}})
       requestUser.data.message.token = token
       dispatch(setUser(requestUser.data.message))

        }catch{
         document.getElementById('error').textContent = 'Username or password are incorrect'
        }
       
    }

    return(
        <div className='loginForm'>
            {user != 'notLogged' ? <Redirect to='/'></Redirect> : ''}

            <form onSubmit={handleSubmit}>
            <h3 className='title'>Username</h3>
            <div className='input'>
                <input type='username' className='formInput' placeholder='Username...' onChange={handleUsernameChange} required></input>
            </div>
            <h3 className='title'>Password</h3>
            <div className='input'>
                <input type='password' className='formInput' placeholder='Password...' onChange={handlePasswordChange} required></input>
            </div>
                <p id='error'></p>
            <button type='submit' className='searchButton'>Login</button>
            </form>
            
        </div>
    )
}

export default Login