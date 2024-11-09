import axios from "axios";
const API_BASE_URL = "https://2573-103-211-190-142.ngrok-free.app";

const authAPI = {
  login: async (payload) => {
    console.log("Login API payload", payload); 
    return await axios.post(`${API_BASE_URL}/api/v1/signIn`, payload);
  },
  signup: async (payload) => {
    return await axiosInstance.post(`${API_BASE_URL}/api/v1/signUp`, payload);
  },
};

export default authAPI;
