import {createSlice} from '@reduxjs/toolkit'

export const userSlicer = createSlice({
   name: 'user',
   initialState: {
      value: 'notLogged'
   },
   reducers: {
      setUser: (state, action) => {
         state.value = action.payload
      },

      setUserDefault: (state) => {
         state.value = 'notLogged'
      }
   }
})

export const {setUser, setUserDefault} = userSlicer.actions

export default userSlicer.reducer