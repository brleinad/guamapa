import axios from 'axios'

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'localhost:8000/api/v1' // process.env.REACT_APP_API_URL
axios.defaults.baseURL = 'http://localhost:8000' // process.env.REACT_APP_API_URL

export default axios