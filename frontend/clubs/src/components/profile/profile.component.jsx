import React from 'react'
import {Link} from 'react-router-dom'
import ClubPreview from '../club-preview/club.component'
import './profile.style.scss'

const Profile = ({user}) => {
    return(
        <div className='profile-page'>
            <div className='profile'>
                <h1></h1>
                <h1 className='name'>{user[0].username}</h1>
                <h3 className='approvedClubs'>Approved clubs: {user[0].approvedClubs.length}</h3>
                <h3 className='approvedArgs'>Approved arguments: {user[0].approvedArguments.length}</h3>
            </div>
            <div className='userClubContainer'>
            {user[0].clubs.length > 0 ? <h3 className='title'>Created clubs</h3> : <h3 className='title'>No clubs created yet!</h3> } 
            {user[0].clubs.map(club => (
                <Link key={club._id} to={`/club/${club.slug}`}>
                   <ClubPreview key={club._id} club={club}/>
                </Link>
                ))}
            </div>
        </div>
    )
}

export default Profile