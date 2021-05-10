import React from 'react'
import './club.style.scss'

const ClubPreview = ({club}) => {
   return(
      <div className='Club' key={club._id}>
         <div className='text-container'>
            <h2 className='name'>{club.slug}</h2>
            <h3 className='topic'>{club.topic}</h3>
            <h4 className='question'>{club.question}</h4>
         </div>
      </div>
   )
}
export default ClubPreview