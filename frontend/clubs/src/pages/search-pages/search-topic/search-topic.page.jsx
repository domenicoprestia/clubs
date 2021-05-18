import React from 'react'
import TopClubs from '../../../components/top-clubs/top-clubs.component'
import SearchBar from '../../../components/search/search.component'
import SearchedClubs from '../../../components/searched-clubs/searched-clubs.component'

const SearchTopic = () => {
    
    return(
        <div className='searchTopic'>
            <SearchBar type='topic'/>
            <TopClubs/>
            <SearchedClubs type='topic'/>
        </div>
    )
}

export default SearchTopic