import React from 'react'
import Argument from '../argument/argument.component'
import './club.style.scss'

const FullClub = ({club}) => {
   console.log(club)
   return(
      <div className='club'>
      {club ? <h2 className='name'>{club.slug}</h2> : "select a club"}
      {club ? <h3 className='topic'>{club.topic}</h3> : ""}
      {club ? <h3 className='question'>{club.question}</h3> : ""}
      {club ? club.arguments.map(arg =>  (<Argument key={arg._id} argument={arg}/>)) : ""}
      </div>
   )
}

export default FullClub

