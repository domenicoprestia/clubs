import React from 'react'
import SearchBar from '../../../components/search/search.component'
import TopClubs from '../../../components/top-clubs/top-clubs.component'

const SearchSlug = () => {

    return(
        <div className='searchSlug'>
            <SearchBar type='slug'/>
            <TopClubs/>
        </div>
    )
}

export default SearchSlug