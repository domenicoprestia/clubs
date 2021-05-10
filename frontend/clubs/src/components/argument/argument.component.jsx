import React from 'react'
import './argument.style.scss'

const Argument = ({argument}) => {

   return(
      <div className='Argument'>
         <p className='body'>{argument.argument}</p>
         <p className='creator'>@{argument.creator}</p>
         <p className='date'>{argument.createdAt}</p>
         <hr></hr>
      </div>
   )
}

export default Argument