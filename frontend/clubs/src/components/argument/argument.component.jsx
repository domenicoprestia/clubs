import React from 'react'
import { Link } from 'react-router-dom'
import './argument.style.scss'

const Argument = ({argument}) => {


   const dataEditor = (data) => {
      data = data.replace('T', ' ')
      data = data.split(':')
      data[2] = ''
      data = data.join(':')
      return data
   }

   return(
      <div className='Argument'>
         <p className='body'>{argument.argument}</p>
         <p className='creator'><Link to={`/user/${argument.creator}`}>@{argument.creator}</Link></p>
         <p className='date'>{dataEditor(argument.createdAt)}</p>
      </div>
   )
}

export default Argument