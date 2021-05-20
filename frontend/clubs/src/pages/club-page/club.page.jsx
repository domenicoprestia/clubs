import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Chatbar from '../../components/chatbar/chatbar.component'
import FullClub from '../../components/full-club/full-club.component'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './club.style.scss'


const Club = () => {

   const {slug} = useParams()
   const user = useSelector((state) => state.user.value)
   const [selectedClub, setSelectedClub] = useState(null)
   const [requestStatus, setRequestStatus] = useState(null)

   

   useEffect(() => {
      async function fetchClub(){
         try{
         const request = await axios.get(requests.clubOnName + slug)
         setSelectedClub(request.data.data[0], console.log(selectedClub))
         setRequestStatus(200)
         }catch{
            setRequestStatus(400)
         }
         
      }
      fetchClub()
   }, [requests.clubOnName])

   return (
      <div className='clubchatcontainer'>
         <div className={user != 'notLogged' ? 'chatbar' : ''}>
            {user != 'notLogged' ? <Chatbar/> : ''}
         </div>
         
         <div className='Club'>
            {requestStatus == 400 ? <h3>Oops the club does not exist...</h3> : ''}
            {selectedClub ? <FullClub club={selectedClub}/> : ''}
         </div>
      </div>
   );
}

export default Club