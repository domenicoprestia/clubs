import {createSlice} from '@reduxjs/toolkit'

export const bookSlice = createSlice({
    name: 'searchedSlugBooks',
    initialState: {
        value: 'noClubsSearched'
    },
    reducers: {
        setSlugClubs: (state, action) => {
            state.value = action.payload
        },

        setSlugDefault: (state) => {
            state.value = 'noClubsSearched'
        }
    }
})

export const {setSlugClubs, setSlugDefault} = bookSlice.actions

export default bookSlice.reducer