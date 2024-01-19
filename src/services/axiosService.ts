import axios from "axios";
import { API_ENDPOINTS } from "../assets/constants/apiContants";
import { GenerateMusicRequestObj } from "../stores/generateStore";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_GEN_API_BASE_URL,
});

axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
  }
);

const setAccessToken = (token: string) => {
  axiosInstance.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

const uploadFileApi = async <T>(uploadFile: any): Promise<T> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.uploadVideo,
      uploadFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const contactApi = async <T>(contactDetails: any): Promise<T> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.contactus,
      contactDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerApi = async ({ requestBody, AUTH_ENDPOINT }: any) => {
  try {
    const { data } = await axiosInstance.post(AUTH_ENDPOINT, requestBody);
    // if (data?.access_token) {
    //   localStorage.setItem("token", data?.access_token);
    // }
    return data;
  } catch (err) {
    throw err;
  }
};

const generateMusicApi = async <T>(
  requestObj: GenerateMusicRequestObj
): Promise<T> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.generateMusicV3,
      requestObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const generateMusicTask = async <T>(
  requestObj: GenerateMusicRequestObj
): Promise<T> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.generateTask,
      requestObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getGeneratedMusic = async <T>(
  requestObj: any
): Promise<T> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.getGeneratedStatus}${requestObj}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("response", response)
    return response.data;
  } catch (error) {
    throw error;
  }
};


const exportMusic = async (requestObj: any): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.exportMusic,
      requestObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getotp = async ({ requestBody, AUTH_ENDPOINT }: any) => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINT, requestBody);
    return response.data.token;
  } catch (error) {
    console.error("Error fetching user token:", error);
    throw error;
  }
};

export {
  uploadFileApi,
  generateMusicApi,
  generateMusicTask,
  getGeneratedMusic,
  registerApi,
  contactApi,
  setAccessToken,
  exportMusic,
  getotp,

};
