import axios from "axios";
import { API_ENDPOINTS } from "../assets/constants/apiContants";
import { GenerateMusicRequestObj } from "../stores/generateStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_GEN_API_BASE_URL,
});

axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

const uploadFileApi = async <T>(uploadFile: any): Promise<T> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.uploadVideo,
      uploadFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: "raaga",
          password: "4S5Ek7un16Qc",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const generateMusicApi = async <T>(
  requestObj: GenerateMusicRequestObj
): Promise<T> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.generateMusicV4,
      requestObj,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: "raaga",
          password: "4S5Ek7un16Qc",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { uploadFileApi, generateMusicApi };
