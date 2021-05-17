import React, { useEffect } from 'react'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './top-clubs.style.scss'

const TopClubs = () => {

    useEffect(async() => {
        const request = await axios.get(requests.topClubs)
        
    }, [])

    return(
        <div className='topClubs'>


        </div>
    )
}

export default TopClubs