import React from 'react'
import { useSelector } from 'react-redux'
import ClubPreview from '../../components/club-preview/club.component'
import Argument from '../../components/argument/argument.component'
import './personal.style.scss'

const PersonalPage = () => {
   
   const user = useSelector(state => state.user.value)

   const editEmail = (str, n) => {
      return str?.length > n ? str.substr(0, n-1) + "..." : str;
   }
   
   return(
      <div className='personal-page'>
            <a href='/profile#approvedArguments'><span className='name'>Edit Profile</span> ✏️</a>
            <h1 className='username'>{user.username}</h1>
            <h3 className='email'>{editEmail(user.email, 20)}</h3>
         <div className='approvedClubs'>
            <h4 className='title'>Approved clubs</h4>
            {user.approvedClubs != undefined ? user.approvedClubs.forEach(club => {
               <ClubPreview key={club._id} club={club}/>
            }) : null}
         </div>

         <div className='title'>
            <h4 className='title'>Approved arguments</h4>
            {user.approvedArguments != undefined ? user.approvedArguments.forEach(arg => {
               <Argument key={arg._id} argument={arg}/>
            }) : null}
         </div>

      </div>
   )
}

export default PersonalPage