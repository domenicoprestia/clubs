import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ClubPreview from '../../components/club-preview/club.component'
import Argument from '../../components/argument/argument.component'

import './personal.style.scss'
import { Link, Redirect } from 'react-router-dom'
import SaveButton from '../../components/save-button/save-button.component'

const PersonalPage = () => {
   
   let user = useSelector((state) => state.user.value)

   const editEmail = (str, n) => {
      return str?.length > n ? str.substr(0, n-1) + "..." : str;
   }

   const dataEditor = (data) => {
      data = data.replace('T', ' ')
      data = data.split(':')
      data[2] = ''
      data = data.join(':')
      data = data.substr(0, data.length-1)
      return data
   }
   
   return(
      <div>
      <div className='personal-page'>
      
         {user !== `notLogged` ? <a href='/profile/edit' className='editTag'><span className='textEdit'>Edit Profile</span> ✏️</a> : null}   
         {user !== `notLogged` ? <h1 className='username'>{user.username}</h1> : <h2>You are not logged in...</h2>}   
            <h3 className='email'>{editEmail(user.email, 20)}</h3>
         </div>
         
         {user.clubs !== undefined && user.clubs.length !== 0 ? <h3 className='title'>Created clubs</h3> : ''}
            <div className='approvedClubs' id='approvedClubs'>
            
               {user.clubs !== undefined ? user.clubs.map(club => (
                  <Link to={`/club/${club.slug}`}>
               <ClubPreview key={club._id} club={club}/>
                  </Link>
               )) : null}
            </div>

         {user.approvedClubs !== undefined && user.approvedClubs.length !== 0 ? <h3 className='title'>Approved clubs</h3> : null}
            <div className='approvedClubs' id='approvedClubs'>
            
               {user.approvedClubs !== undefined ? user.approvedClubs.map(club => (
                  <Link to={`/club/${club.slug}`}>
               <ClubPreview key={club._id} club={club}/>
                  </Link>
               )) : null}
            

            </div>

          {user.approvedArguments !== undefined && user.approvedArguments.length !== 0 ? <h3 className='title'>Approved arguments</h3> : null}
            <div className='approvedArguments' id='approvedArguments'>

            <div className={user !== 'notLogged' && user.approvedArguments !== undefined && user.approvedArguments[0] !== undefined ? 'argumentContainer' : ''}>
               {user.approvedArguments !== undefined ? user.approvedArguments.map(arg => (
                  
                  <div className='argument'>
                  <div className='container'>
                     <Link to={`/club/${arg.clubSlug}`}><h3 className='place'>{arg.clubSlug}</h3></Link>
                     <SaveButton id={arg._id} type='argument'/>
                  </div>
                        <p className='body'>{arg.argument}</p>
                     

                     <p className='creator'><Link to={`/user/${arg.creator}`}>@{arg.creator}</Link></p>
                     <p className='date'>{dataEditor(arg.createdAt)}</p>

                  </div>
               )) : null}
            </div>

            </div>
      </div>
   )
}

export default PersonalPage