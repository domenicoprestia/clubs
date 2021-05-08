import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Club from '../club/club.component'
import axios from '../../utils/axios'
import requests from '../../utils/requests'

const AllClubsContainer = () => {

   const [clubs, setClubs] = useState([])

   useEffect(() => {
      async function fetchBooks(){
         const request = await axios.get(requests.allClubs)
         
         let fetchedClubs = []

         request.data.data.forEach(club => {
            fetchedClubs.push(club)
         })
         setClubs(fetchedClubs)
      }

      fetchBooks()
   }, [requests.allClubs])

   return(
      <div className='AllClubsContainer'>
         {clubs.map(club => (
               <Link to={`/clubs/${club._id}`}>
                  <Club id={club._id} club={club}/>
               </Link>
         ))}
      </div>
   )
}

export default AllClubsContainer