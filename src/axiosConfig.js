import axios from 'axios'

// axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
// axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export default axios