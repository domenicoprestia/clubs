import {createSlice} from '@reduxjs/toolkit'

export const bookSlice = createSlice({
    name: 'searchedTopicBooks',
    initialState: {
        value: 'noClubsSearched'
    },
    reducers: {
        setTopicBooks: (state, action) => {
            state.value = action.payload
        },

        setTopicDefault: (state) => {
            state.value = 'noClubsSearched'
        }
    }
})

export const {setTopicBooks, setTopicDefault} = bookSlice.actions

export default bookSlice.reducer