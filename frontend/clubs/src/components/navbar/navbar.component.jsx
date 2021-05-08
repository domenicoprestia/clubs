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
               <Link to='/search'><span className='name'>Search Clubs</span> 🔎</Link>
            </li>
         <h3 className='title'>Genres</h3>
            <li>
               <a href='/#Fiction'><span className='name'>Search Topic</span> 💭</a>
            </li>
            <li>
               <a href='/#Poetry'><span className='name'>Search Name</span> 📜</a>
            </li>
            <li>
               <a href='/#Fantasy'><span className='name'>Approved Clubs</span> 🐉</a>
            </li>
            <li>
               <a href='/#Romance'><span className='name'>Approved arguments</span> 💖</a>
            </li>

            <li>
               <a href='/#Science'><span className='name'>Profile</span> 🔬</a>
            </li>
         </ul>
      </div>
   )
}

export default Navbar