import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import {setUser} from '../../utils/slicers/userSlicer'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './edit-page.style.scss'

const EditPage = () => {
    const user = useSelector(state => state.user.value)
    const token = JSON.parse(localStorage.getItem('user')).token
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    let valid
    let first = true

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(valid){
            try{
            const request = await axios.put(requests.editUser, {username: username,  email: email, password: password}, {headers: {'auth-token': user.token}})
            const requestUser = await axios.get(requests.userAuth, {headers: {'auth-token': token}})
            requestUser.data.message.token = token
            console.log(requestUser.data.message)
            dispatch(setUser(requestUser.data.message))
            localStorage.setItem('user', JSON.stringify(requestUser.data.message))
            window.location.replace('/')
            }catch{
                document.getElementById('errorUsername').textContent = `Username is duplicate`
            }
        }
    }

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
    
    useEffect(() => {
        
    console.log(user)

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
        
        if(user != 'notLogged') document.getElementById('username').value = user.username
        if(user != 'notLogged') document.getElementById('email').value = user.email
        
    }, [password, confirmPassword, username, email, user])

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return(
        <div className='edit-page'>
            {token ? '' : <Redirect to='/'/>}
            <form onSubmit={handleSubmit}>
            <h3 className='title'>Username</h3>
            <div className='input'>
                <input type='username' className='edit-input' placeholder='Username...' onChange={handleUsername} id='username' required></input>
                <p  className='error' id='errorUsername'></p>
            </div>
            <h3 className='title'>Email</h3>
            <div className='input'>
                <input type='email' className='edit-input' placeholder='Email...' onChange={handleEmail} id='email' required></input>
                <p  className='error' id='errorEmail'></p>
            </div>
            <h3 className='title'>Password</h3>
            <div className='input'>
                <input type='password' className='edit-input' placeholder='Password...' onChange={handlePassword} id='password' required></input>
                <p  className='error' id='errorPassword'></p>
            </div>
            <h3 className='title'>Confirm Password</h3>
            <div className='input'>
                <input type='password'  className='edit-input' placeholder='Confirm Password...' onChange={handleConfirmPassword} id='confirmPassword' required></input>
                <p  className='error' id='errorConfirm'></p>
            </div>
                <button type='submit' className='searchButton'>Edit Profile!</button>
            </form>
        
        </div>
    )
}

export default EditPage