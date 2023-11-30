import { create } from "zustand";
import { API_STATUS_TYPES } from "../assets/constants/apiContants";
import { uploadFileApi, generateMusicApi } from "../services/axiosService";

export interface GenerateMusicRequestObj {
  referenceFileUrl?: string;
  instrument?: string;
  prompt?: string;
  genre?: string;
  tempo?: string;
  duration?: number;
}

export interface GenerateMusicResponse {
  gcs_url: string[];
  message: string;
}

export interface TimeFrameData {
  id: number;
  selectedOptions?: GenerateMusicRequestObj;
  selectedMusicUrl?: string;
  generatedData?: GenerateMusicResponse;
}

interface IGenerateState {
  timeFrameData: TimeFrameData[];
  file?: object | null;
  currentTimeFrameId?: number;
  generatedMusicUrls?: string[];
  status: API_STATUS_TYPES;
  error?: object | null;
  duration?: number;
}

interface IGenerateActions {
  uploadFile: (file: any) => void;
  generateMusic: (requestObj: GenerateMusicRequestObj) => void;
  setDuration: (duration: number) => void;
  addNewTimeFrame: (id: number) => void;
  updateCurrentTimeFrameDetails: (id: number, duration: number) => void;
}

const initialState: IGenerateState = {
  timeFrameData: [],
  file: null,
  status: API_STATUS_TYPES.idle,
  error: null,
};

type IGenerateStore = IGenerateState & IGenerateActions;

export const useGenerateStore = create<IGenerateStore>((set, get) => ({
  ...initialState,
  uploadFile: async (file: any) => {
    try {
      set(() => ({ status: API_STATUS_TYPES.loading }));
      const data = await uploadFileApi<object>(file);
      set(() => ({ status: API_STATUS_TYPES.success, file: data }));
    } catch (error: any) {
      set(() => ({ status: API_STATUS_TYPES.failed, error }));
    }
  },
  setDuration: (duration: number) => {
    set(() => ({ duration }));
  },
  updateCurrentTimeFrameDetails: (id: number, duration: number) => {
    set(() => ({ currentTimeFrameId: id, duration }));
  },
  addNewTimeFrame: (id: number) => {
    const timeFrameData = get().timeFrameData;
    const newTimeFrameData = { id };
    set(() => ({ timeFrameData: [...timeFrameData, newTimeFrameData] }));
  },
  generateMusic: async (requestObj: GenerateMusicRequestObj) => {
    try {
      set(() => ({ status: API_STATUS_TYPES.loading }));
      const data: any = await generateMusicApi<object>({
        ...requestObj,
        duration: get().duration,
      });
      const updateTimeFrames = get().timeFrameData.map(
        (timeFrame: TimeFrameData) => {
          if (timeFrame.id === get().currentTimeFrameId) {
            return {
              ...timeFrame,
              generatedData: data,
            };
          }
          return timeFrame;
        }
      );
      set(() => ({
        status: API_STATUS_TYPES.success,
        timeFrameData: updateTimeFrames,
      }));
    } catch (error: any) {
      set(() => ({ status: API_STATUS_TYPES.failed, error }));
    }
  },
}));
