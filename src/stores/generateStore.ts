import { create } from "zustand";
import { API_STATUS_TYPES } from "../assets/constants/apiContants";
import { uploadFileApi, generateMusicApi } from "../services/axiosService";

export interface GenerateMusicRequestObj {
  referenceFileUrl?: string;
  instrument?: string;
  emotion?: string;
  genre?: string;
  tempo?: string;
}

interface IGenerateStore {
  file?: object | null;
  generatedMusicUrls?: string[];
  status: API_STATUS_TYPES;
  error?: object | null;
  uploadFile?: (file: any) => void;
  generateMusic?: (requestObj: GenerateMusicRequestObj) => void;
}

const initialState: IGenerateStore = {
  file: null,
  status: API_STATUS_TYPES.idle,
  error: null,
};

export const useGenerateStore = create<IGenerateStore>((set, get) => ({
  ...initialState,
  uploadFile: async (file: any) => {
    try {
      const data = await uploadFileApi<object>(file);
      set(() => ({ status: API_STATUS_TYPES.success, data }));
    } catch (error: any) {
      set(() => ({ status: API_STATUS_TYPES.failed, error }));
    }
  },
  generateMusic: async (requestObj: GenerateMusicRequestObj) => {
    try {
      const data: any = await generateMusicApi<object>(requestObj);
      set(() => ({
        status: API_STATUS_TYPES.success,
        generatedMusicUrls: data?.gcs_url,
      }));
    } catch (error: any) {
      set(() => ({ status: API_STATUS_TYPES.failed, error }));
    }
  },
}));
