import React from 'react'
import { useSelector } from 'react-redux'
import Profile from '../../components/profile/profile.component'
import './personal.style.scss'

const PersonalPage = () => {
   
   const user = useSelector(state => state.user.value)


   return(
      <div className='personal-page'>
      </div>
   )
}

export default PersonalPage