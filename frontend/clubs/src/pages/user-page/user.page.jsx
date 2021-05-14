import axios from '../../utils/axios'
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Profile from '../../components/profile/profile.component'
import requests from '../../utils/requests'
import './user.style.scss'


const ProfilePage = () => {
    const {username} = useParams()
    const [selectedUser, setSelectedUser] = useState(null)
    useEffect(() => {
        async function fetchUsername(){
            const request = await axios.get(requests.userOnName + username)
            setSelectedUser(request.data.message)
        }

        fetchUsername()

    }, [])
        
    return(
        <div className='userPage'>
            {selectedUser != null && selectedUser.length != 0 ? <Profile user={selectedUser}/> : <h1>Oops, no user found with that username... 🤖</h1>}
        </div>
    )
}

export default ProfilePage