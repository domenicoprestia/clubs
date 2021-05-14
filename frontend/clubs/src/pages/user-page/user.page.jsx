import axios from '../../utils/axios'
import React, { Component, useState} from 'react'
import { useParams } from 'react-router'
import Profile from '../../components/profile/profile.component'
import requests from '../../utils/requests'
import './user.style.scss'

class UserPage extends Component {
    constructor(){
        super()
        this.state = {user: []}
    }

    componentDidMount(){
        
    }
}


const UserPage = () => {
    const {username} = useParams()
    const [selectedUser, setSelectedUser] = useState(null)

        async function fetchUsername(){
            const request = await axios.get(requests.userOnName + username)
            setSelectedUser(request.data.message, console.log(selectedUser))
        }

        fetchUsername()

    return(
        <div className='userPage'>
            <Profile user={selectedUser}/>
        </div>
    )
}

export default UserPage