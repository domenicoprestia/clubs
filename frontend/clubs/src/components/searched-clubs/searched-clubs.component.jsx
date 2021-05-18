import React from 'react'
import { useSelector } from 'react-redux'
import ClubPreview from '../../components/club-preview/club.component'
import {Link} from 'react-router-dom'

const SearchedClubs = ({type}) => {
    
    const slugClubs = useSelector((state) => state.searchedSlug.value)
    const topicClubs = useSelector((state) => state.searchedTopic.value)
    let clubs 

    if(type == 'slug'){
        clubs = slugClubs
    }else if(type == 'topic'){
        clubs = topicClubs
        console.log('topic')
    }

    return(
        <div className='savedClubs'>

        {clubs = 'noClubsSearched' ? null : clubs.map(club => (               
                <Link key={club._id} to={`/club/${club.slug}`}>
                  <ClubPreview key={club._id} club={club}/>
               </Link>
        ))}

        </div>
    )
}

export default SearchedClubs