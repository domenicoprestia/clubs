import axios from '../../utils/axios'
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Profile from '../../components/profile/profile.component'
import requests from '../../utils/requests'
import './user.style.scss'


const ProfilePage = () => {
    const {username} = useParams()
    const [selectedUser, setSelectedUser] = useState(null)
    const [requestStatus, setRequestStatus] = useState(null)

    useEffect(() => {
        async function fetchUsername(){
            
            try{
            const request = await axios.get(requests.userOnName + username)
            setSelectedUser(request.data.message)
            setRequestStatus(200)
            }catch{
            setRequestStatus(400)
            }

        }

        fetchUsername()

    }, [])
        
    return(
        <div className='userPage'>
            {selectedUser != null && selectedUser.length != 0 ? <Profile user={selectedUser}/> : <h1>Oops, no user found... 🤖</h1>}
        </div>
    )
}

export default ProfilePage