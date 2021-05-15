import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.style.scss'

const Navbar = () => {
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
               <a href='/#Science'><span className='name'>Profile</span> 🔬</a>
            </li>
            <li>
               <a href='/#Fantasy'><span className='name'>Approved Clubs</span> 🐉</a>
            </li>
            <li>
               <a href='/#Romance'><span className='name'>Approved arguments</span> 💖</a>
            </li>
         </ul>
      </div>
   )
}

export default Navbar