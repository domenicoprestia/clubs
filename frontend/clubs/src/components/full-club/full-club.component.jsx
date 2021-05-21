import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Argument from '../argument/argument.component'
import SaveButton from '../save-button/save-button.component'
import './club.style.scss'



const FullClub = ({club}) => {

   const user = useSelector((state) => state.user.value)
   
   return(
      <div className='club'>
      <div className='container'>
         <h2 className='name'>{club.slug}</h2> 
         {user != `notLogged` ? <SaveButton id={club._id} type='club'/> : ``}
      </div>
         <h3 className='topic'><Link to={`/user/${club.creator}`}>@{club.creator}</Link>'s {club.topic}</h3> 
         <h3 className='question'>{club.question}</h3> 
         {club.arguments.map(arg =>  (<Argument key={arg._id} argument={arg}/>))}
      </div>
   )
}

export default FullClub

