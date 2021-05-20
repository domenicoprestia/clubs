import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './chatbar.style.scss'

const Chatbar = () => {

    const [argument, setArgument] = useState()
    const user = useSelector((state) => state.user.value)

    const handleArgument = (e) => {
        e.preventDefault()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(

        <div>
            <form onSubmit={handleSubmit}>
            <div className='input'>
                <input type='text' className='formInput' placeholder='Argument...' onChange={handleArgument} required></input>
                <button type='submit' className='argumentButton'>Send it...</button>
            </div>
                <p className='error' id='errorArgument'></p>
            </form>
        </div>
    )
}

export default Chatbar