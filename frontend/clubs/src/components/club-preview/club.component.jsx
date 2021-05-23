import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SaveButton from '../save-button/save-button.component'
import './club.style.scss'

const ClubPreview = ({club}) => {

   const user = useSelector((state) => state.user.value)

   return(
      <div className='Club' key={club._id}>
         <div className='text-container'>
            <div className='container'>
               <h2 className='name'>{club.slug}</h2>
               <Link to={window.location}>
               {user != `notLogged` ? <SaveButton id={club._id} type='club' />  :  null}
               </Link>
            </div>
            <h3 className='topic'>{club.topic}</h3>
            <h4 className='question'>{club.question}</h4>
         </div>
      </div>
   )
}
export default ClubPreview