import {createSlice} from '@reduxjs/toolkit'

export const bookSlice = createSlice({
    name: 'searchedSlugBooks',
    initialState: {
        value: 'noClubsSearched'
    },
    reducers: {
        setSlugBooks: (state, action) => {
            state.value = action.payload
        },

        setSlugDefault: (state) => {
            state.value = 'noClubsSearched'
        }
    }
})

export const {setSlugBooks, setSlugDefault} = bookSlice.actions

export default bookSlice.reducer