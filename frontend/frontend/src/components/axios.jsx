import axios from 'axios';

// this is used to streamline the connection to the backend
export default axios.create({
    baseURL: 'http://127.0.0.1:5000/'
});