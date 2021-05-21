import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../utils/slicers/userSlicer'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './save-button.style.scss'

const SaveButton = ({id, type}) => { 

   const user = useSelector((state) => state.user.value)
   const dispatch =  useDispatch()
   let same 

   const handleClick = async () => {
      if(type == 'club'){
      await axios.put(requests.approveClub + `${id}/approve`,{}, {headers: {'auth-token': user.token}})
      const newUser = await axios.get(requests.userOnName + user.username)
      newUser.data.message[0].token = user.token
      await dispatch(setUser(newUser.data.message[0]))
      localStorage.setItem('user', JSON.stringify(user))
      }else if(type == 'argument'){
      console.log(type)
      await axios.put(requests.approveArgument + `${id}/argument/approve`, {}, {headers: {'auth-token': user.token}})
      const newUser = await axios.get(requests.userOnName + user.username)
      newUser.data.message[0].token = user.token
      await dispatch(setUser(newUser.data.message[0]))
      localStorage.setItem('user', JSON.stringify(user))
      }
   }

   return(
      <div className='save-button'>
        {type == 'argument' ? user.approvedArguments.forEach(argument => {if(argument._id == id) same=true}) : user.approvedClubs.forEach(club => {if(club._id == id) same = true})}
         {same ? <p className='save' onClick={handleClick}>Remove this! 🗑️</p> : <p className='save' onClick={handleClick}>Save this! 🌟</p>}
      </div>
   )
}

export default SaveButton