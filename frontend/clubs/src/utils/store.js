import {configureStore} from '@reduxjs/toolkit'
import searchedTopicSlicer from './slicers/searchedTopicSlicer'
import searchedSlugSlicer from './slicers/searchedSlugSlicer'

export default configureStore({
    reducer: {
        searchedTopic: searchedTopicSlicer,
        searchedSlug: searchedSlugSlicer
    }
})