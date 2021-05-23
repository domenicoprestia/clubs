import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SaveButton from '../save-button/save-button.component'
import './argument.style.scss'

const Argument = ({argument}) => {

   const user = useSelector((state) => state.user.value)

   const dataEditor = (data) => {
      data = data.replace('T', ' ')
      data = data.split(':')
      data[2] = ''
      data = data.join(':')
      data = data.substr(0, data.length - 1)
      return data
   }

   return(
      <div className='Argument'>
         <div className='container'>
            <p className='body'>{argument.argument}</p>
            {user != `notLogged` ? <SaveButton id={argument._id} type='argument'/> : ``}
         </div>
         <p className='creator'><Link to={`/user/${argument.creator}`}>@{argument.creator}</Link></p>
         <p className='date'>{dataEditor(argument.createdAt)}</p>
      </div>
   )
}

export default Argument