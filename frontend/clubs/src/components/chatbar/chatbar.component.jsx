import React, { useState, useParams } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './chatbar.style.scss'

const Chatbar = ({slug}) => {

    const [argument, setArgument] = useState()
    const user = useSelector((state) => state.user.value)

    const handleArgument = (e) => {
        setArgument(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let id 

        if(String(argument).length > 6 && user.token){
            document.getElementById('errorArgument').textContent = ``

            try{
                const request = await axios.get(requests.clubOnName + slug)
                id = request.data.data[0]._id

                await axios.put( requests.argumentClub + id + `/argument`, {argument: argument}, {headers: {'auth-token': user.token}})
                window.location.reload()

            }catch{

            }
            
        }else{
            document.getElementById('errorArgument').textContent = `Argument is too short`
        }
    }

    return(

        <div>
            <form onSubmit={handleSubmit}>
            <div className='input'>
                <input type='text' className='formInput' placeholder='Argument...' onChange={handleArgument} required></input>
                <button type='submit' className='argumentButton'>✈️</button>
                <p className='error' id='errorArgument'></p>
            </div>
            </form>
        </div>
    )
}

export default Chatbar