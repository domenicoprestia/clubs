import React from 'react'
import SearchBar from '../../../components/search/search.component'
import TopClubs from '../../../components/top-clubs/top-clubs.component'
import SearchedClubs from '../../../components/searched-clubs/searched-clubs.component'

const SearchSlug = () => {

    return(
        <div className='searchSlug'>
            <SearchBar type='slug'/>
            <div className='topSection'>
                <TopClubs/>
            </div>
            <SearchedClubs type='slug'/>
        </div>
    )
}

export default SearchSlug