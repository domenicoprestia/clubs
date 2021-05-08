import axios from 'axios'

const urlInstance = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_URL
})

export default urlInstance