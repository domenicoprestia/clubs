import React, {useState} from 'react'
import axios from '../../utils/axios'
import requests from '../../utils/requests'
import './search.style.scss'

const SearchBar = ({type}) => {
    
    const [inputField, setInputField] = useState()
    const [searchedArr, setSearchedArr] = useState()

    const handleChange = (e) => {
        setInputField([e.target.value])
     }

    const handleSubmit = async (e) => {
        
        e.preventDefault()

        if(type == 'slug'){
            const request = await axios.get(requests.clubsOnName + inputField)
            

        }else if(type == 'topic'){
            const request = await axios.get(requests.clubOnTopic + inputField)
            

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