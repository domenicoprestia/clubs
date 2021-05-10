import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FullClub from './full-club.component'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './club.style.scss'


const Club = () => {

   const {slug} = useParams()
   const [selectedClub, setSelectedClub] = useState(null)

   

   useEffect(() => {
      async function fetchClub(){
         const request = await axios.get(requests.clubOnName + slug)
         setSelectedClub(request.data.data[0], console.log(selectedClub))
      }
      fetchClub()
   }, [requests.clubOnName])

   return (
      <div className='Club'>
         <FullClub club={selectedClub}/>
      </div>
   );
}

export default Club