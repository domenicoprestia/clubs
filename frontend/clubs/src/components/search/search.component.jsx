import React, {useState} from 'react'
import './search.style.scss'

const SearchBar = () => {
    
    const [inputField, setInputField] = useState()

    const handleChange = (e) => {
        setInputField([e.target.value])
     }

    return(
        <div >
            <div className='search'>
                    <input type='search' class='searchInput' placeholder='Search...' onChange={handleChange}></input>
                    <button type='submit' class='searchButton'>🔎</button>
            </div>
        </div>
    )
}

export default SearchBar