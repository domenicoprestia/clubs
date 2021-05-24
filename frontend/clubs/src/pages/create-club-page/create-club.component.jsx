import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './create-club.style.scss'


const CreateClub = () => {
    const user = useSelector((state) => state.user.value)
    const token = JSON.parse(localStorage.getItem('user')).token
    const [name, setName] = useState('')
    const [topic, setTopic] = useState('')
    const [question, setQuestion] = useState('')

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleTopic = (e) => {
        setTopic(e.target.value)
    }

    const handleQuestion = (e) => {
        setQuestion(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        await axios.post(requests.createClub, {'name': name, 'topic': topic, 'question': question}, {headers:{'auth-token': token}})
        window.location.replace('/')
        }
        catch{
            document.getElementById('name').value = ''
            document.getElementById('errorName').textContent = 'Club name already exist'
        }
    }

    useEffect(() => {
        if(name.length < 6){
            document.getElementById('errorName').textContent = 'Name too short'
        }else{
            document.getElementById('errorName').textContent = ''
        }

        if(question.length < 3){
            document.getElementById('errorQuestion').textContent = 'Question too short'
        }else{
            document.getElementById('errorQuestion').textContent = ''
        }

        if(topic.length < 3){
            document.getElementById('errorTopic').textContent = 'Topic too short'
        }else{
            document.getElementById('errorTopic').textContent = ''
        }

    }, [name, topic, question])

    return(
        <div className='create-club'>
            {token ? '' : <Redirect to='/'/>}
            <form onSubmit={handleSubmit}>
            <h3 className='title'>Name</h3>
            <div className='input'>
                <input type='text' className='createInput' id='name' placeholder='Name...' onChange={handleName} required></input>
                <p className='error' id='errorName'></p>
            </div>
            <h3 className='title'>Email</h3>
            <div className='input'>
                <input type='text' className='createInput' id='topic' placeholder='Topic...' onChange={handleTopic} required></input>
                <p  className='error' id='errorTopic'></p>
            </div>
            <h3 className='title'>Password</h3>
            <div className='input'>
                <input type='text' className='createInput' id='question' placeholder='Question...' onChange={handleQuestion} required></input>
                <p  className='error' id='errorQuestion'></p>
            </div>
                <button type='submit' className='searchButton'>Create club</button>
            </form>
        </div>
    )
}

export default CreateClub