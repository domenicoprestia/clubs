import {configureStore} from '@reduxjs/toolkit'
import searchedTopicSlicer from './slicers/searchedTopicSlicer'
import searchedSlugSlicer from './slicers/searchedSlugSlicer'
import userSlicer from './slicers/userSlicer'

export default configureStore({
    reducer: {
        searchedTopic: searchedTopicSlicer,
        searchedSlug: searchedSlugSlicer,
        user: userSlicer
    }
})