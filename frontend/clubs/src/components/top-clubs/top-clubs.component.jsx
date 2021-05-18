import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import ClubPreview from '../club-preview/club.component'
import './top-clubs.style.scss'

const TopClubs = () => {

    const [topClubs, setTopClubs] = useState(404)

    useEffect(async() => {
        const request = await axios.get(requests.topClubs)
        setTopClubs(request.data.data)

    }, [])

    return(
        <div className='topClubs'>
            
            <h2 className='title'>Top clubs</h2>
            <div className='topContainer'>
            {topClubs == 404 ? null : topClubs.map(club => (
                <Link key={club._id} to={`/club/${club.slug}`}>
                    <ClubPreview key={club._id} club={club}/>
                </Link>
            ))}
            </div>

        </div>
    )
}

export default TopClubs