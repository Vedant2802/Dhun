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
          'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTVkZDBhOTJlZjA2NzQ0MzU4YTk0N2EiLCJpYXQiOjE3MDEzNTAxNTAsIm5iZiI6MTcwMTM1MDE1MCwianRpIjoiNjVjZTQyZWItZDYyZC00NWFhLThhMDItY2FhYmM3MGIyZTE5IiwiZXhwIjoxNzAxMzkzMzUwLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlLCJyb2xlIjoidXNlciIsImlzQmxvY2tlZCI6ZmFsc2V9.ypcxPRBQUXEjZwj3OCJohK9By19mL5d94lrQMVQvHcU'
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
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTVkZDBhOTJlZjA2NzQ0MzU4YTk0N2EiLCJpYXQiOjE3MDEzNjI1MzAsIm5iZiI6MTcwMTM2MjUzMCwianRpIjoiOTM2MWVlOTQtZDcwNi00ZDFkLWEwZTEtY2EwZWY4ZWQ5NmU0IiwiZXhwIjoxNzAxNDA1NzMwLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlLCJyb2xlIjoidXNlciIsImlzQmxvY2tlZCI6ZmFsc2V9.r8OtJtUd21nPbhv-C6zR9k13EsVbCATKavLVGdPuxG8",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { uploadFileApi, generateMusicApi };
