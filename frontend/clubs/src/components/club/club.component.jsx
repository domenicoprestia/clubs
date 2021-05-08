import React from 'react'

const Club = ({club}) => {
   return(
      <div className='Club' key={club._id}>
         <h1>{club.name}</h1>
         <h2>{club.topic}</h2>
      </div>
   )
}
export default Club