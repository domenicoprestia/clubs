import axios from '../../../utils/axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import requests from '../../../utils/requests'
import { setUser } from '../../../utils/slicers/userSlicer'
import './register.style.scss'

export const Register = () => {

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    let valid = true

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = async (e) => {
          setConfirmPassword(e.target.value)       
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(valid){
            const request = await axios.post(requests.register, {username: username,  email: email, password: password})
            const token = request.data
            const requestUser = await axios.get(requests.userAuth, {headers: {'auth-token': token}})
            requestUser.data.message.token = token
            dispatch(setUser(requestUser.data.message))

        }

    }

    useEffect(() => {

        if(String(password).length < 8 ){
            document.getElementById('errorPassword').textContent = `Password is too short!`
            valid = false
        }else{
            document.getElementById('errorPassword').textContent = ``
            valid = true 
        }

        if(password != confirmPassword){
            document.getElementById('errorConfirm').textContent = `Passwords don't match!`
            valid = false
        }else{
            document.getElementById('errorConfirm').textContent = ``
            valid = true 
        }


        if(String(username).length < 6 || String(username).length > 20 && username != null || String(username).includes(' ') ){
            document.getElementById('errorUsername').textContent = `Username is not appropriate`
            valid = false
        }else{
            document.getElementById('errorUsername').textContent = ``
            valid = true 
        }

        if(validateEmail(email) == false){
            document.getElementById('errorEmail').textContent = `Email is not valid`
            valid = false
        }else{
            document.getElementById('errorEmail').textContent = ``
            valid = true 
        }

    }, [password, confirmPassword, username, email])

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    return(
        <div className='registerFrom'>
            {user != 'notLogged' ? <Redirect to='/'/> : ''}
            <form onSubmit={handleSubmit}>
            <h3 className='title'>Username</h3>
            <div className='input'>
                <input type='username' className='formInput' placeholder='Username...' onChange={handleUsername} required></input>
                <p htmlFor='confirmPassword' className='error' id='errorUsername'></p>
            </div>
            <h3 className='title'>Email</h3>
            <div className='input'>
                <input type='email' className='formInput' placeholder='Email...' onChange={handleEmail} required></input>
                <p htmlFor='confirmPassword' className='error' id='errorEmail'></p>
            </div>
            <h3 className='title'>Password</h3>
            <div className='input'>
                <input type='password' className='formInput' placeholder='Password...' onChange={handlePassword} required></input>
                <p htmlFor='confirmPassword' className='error' id='errorPassword'></p>
            </div>
            <h3 className='title'>Confirm Password</h3>
            <div className='input'>
                <input type='password' name='confirmPassword' className='formInput' placeholder='Confirm Password...' onChange={handleConfirmPassword} required></input>
                <p htmlFor='confirmPassword' className='error' id='errorConfirm'></p>
            </div>
            
            </form>
        </div>
    )
}

export default Register