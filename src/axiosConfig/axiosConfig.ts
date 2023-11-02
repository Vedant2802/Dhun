import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://musicgenai.zee5.com'
});


axiosInstance.defaults.headers.common['Accept'] = "application/json";
axiosInstance.defaults.headers.common['Content-Type'] = "application/json"

export default axiosInstance;