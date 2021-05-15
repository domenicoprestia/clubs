import React from 'react'
import { Link } from 'react-router-dom'
import Argument from '../argument/argument.component'
import './club.style.scss'

const FullClub = ({club}) => {
   console.log(club)
   return(
      <div className='club'>
         <h2 className='name'>{club.slug}</h2> 
      
         <h3 className='topic'><Link to={`/user/${club.creator}`}>@{club.creator}</Link>'s {club.topic}</h3> 
         <h3 className='question'>{club.question}</h3> 
         {club.arguments.map(arg =>  (<Argument key={arg._id} argument={arg}/>))}
      </div>
   )
}

export default FullClub

