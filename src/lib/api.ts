import axios from 'axios'

export const request = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 10000,
    headers: {
        Authorization: "Bearer token"
    }
})