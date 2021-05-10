import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ClubPreview from '../club-preview/club.component'
import axios from '../../utils/axios'
import requests from '../../utils/requests'

const AllClubsContainer = () => {

   const [clubs, setClubs] = useState([])

   useEffect(() => {
      async function fetchClubs(){
         const request = await axios.get(requests.allClubs)
         
         let fetchedClubs = []

         request.data.data.forEach(club => {
            fetchedClubs.push(club)
         })
         setClubs(fetchedClubs)
      }

      fetchClubs()
   }, [requests.allClubs])

   return(
      <div className='AllClubsContainer'>
         {clubs.map(club => (
               <Link key={club._id} to={`/club/${club.slug}`}>
                  <ClubPreview key={club._id} club={club}/>
               </Link>
         ))}
      </div>
   )
}

export default AllClubsContainer