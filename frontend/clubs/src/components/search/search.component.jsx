import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setTopicBooks, setTopicDefault} from '../../utils/slicers/searchedTopicSlicer'
import {setSlugBooks, setSlugDefault} from '../../utils/slicers/searchedSlugSlicer'
import axios from '../../utils/axios'
import requests from '../../utils/requests'

import './search.style.scss'

const SearchBar = ({type}) => {
    
    const [inputField, setInputField] = useState()
    
    const topicBooks = useSelector((state) => state.searchedTopic.value)
    const slugBooks = useSelector((state) => state.searchedSlug.value)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputField([e.target.value])
     }

    const handleSubmit = async (e) => {
        
        e.preventDefault()

        if(type == 'slug'){

            await dispatch(setSlugDefault())
            const request = await axios.get(requests.clubsOnName + inputField)
            await dispatch(setSlugDefault(request.data.data))
            console.log(slugBooks)

        }else if(type == 'topic'){

            await dispatch(setTopicDefault())
            const request = await axios.get(requests.clubOnTopic + inputField)
            await dispatch(setTopicBooks(request.data.data))
            console.log(topicBooks)
            

        }

    }

    return(
        <div >
            <form onSubmit={handleSubmit}>
                <div className='search'>
                    <input type='search' className='searchInput' placeholder='Search...' onChange={handleChange}></input>
                    <button type='submit' className='searchButton'>🔎</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar