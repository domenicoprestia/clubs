import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setUser, setUserDefault} from '../../utils/slicers/userSlicer.js'
import {Link, Redirect} from 'react-router-dom'
import './navbar.style.scss'

const Navbar = () => {

   const user = useSelector((state) => state.user.value)
   const dispatch = useDispatch()

   const logout = () => {
       dispatch(setUserDefault())
       localStorage.removeItem('user')
   }

   useEffect(() => {
      if(user == 'notLogged' && JSON.parse(localStorage.getItem('user'))) dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
   }, [user])

   return(
      <div className='side-nav'>
      <Link to='/'><h2 className='logo'>clubs</h2></Link>
         <ul>
         <h3 className='title'>Discovery</h3>
            <li>
               <Link to='/search/topic'><span className='name'>Search Topic</span> 🔎</Link>
            </li>
            <li>
               <Link to='/search/slug'><span className='name'>Search Name</span> 📜</Link>
            </li>
         <h3 className='title'>User's area</h3>
            <li>

            {user != 'notLogged' ? <a href='/profile'><span className='name'>Profile</span> 🔬</a> : <a href='/login'><span className='name'>Log in</span> 🚪</a>}
               
            </li>
            <li>
               {user != 'notLogged' ? <a href='/profile#approvedClubs'><span className='name'>Approved Clubs</span> 🐉</a> : <a href='/register'><span className='name'>Register</span> 🍘</a> } 
            </li>
            <li>
               {user != 'notLogged' ? <a href='/profile#approvedArguments'><span className='name'>Approved arguments</span> 💖</a> : ''}
            </li>
            <li>
               {user != 'notLogged' ? <a href='/' onClick={logout}><span className='name'>Logout</span> 🏃‍♂️</a> : ''}
            </li>
         </ul>
      </div>
   )
}

export default Navbar