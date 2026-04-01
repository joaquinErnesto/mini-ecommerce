import axios from "axios"

// Create Axios instance
export const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000 // recommended
})

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        console.log("Request sent:", config)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        console.log("Response recieved:", response)
        return response
    },
    (error) => {
        console.error("API Error:", error)
        return Promise.reject(error)
    }
)