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
    if (data?.access_token) {
      localStorage.setItem("token", data?.access_token);
    }
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

export {
  uploadFileApi,
  generateMusicApi,
  registerApi,
  contactApi,
  setAccessToken,
};
