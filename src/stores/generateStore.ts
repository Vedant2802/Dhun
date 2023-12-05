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
  urls: string[];
  message: string;
}

export interface TimeFrameData {
  id: number;
  selectedOptions?: GenerateMusicRequestObj;
  selectedMusicUrl?: string;
  generatedData?: GenerateMusicResponse;
}

export interface WebsiteData {
  musicUrls?: string[];
  status: API_STATUS_TYPES;
  error?: any;
}

interface IGenerateState {
  timeFrameData: TimeFrameData[];
  file?: object | null;
  currentTimeFrameId?: number;
  generatedMusicUrls?: string[];
  status: API_STATUS_TYPES;
  error?: object | null;
  duration?: number;
  currentMusicSrc?: string;
  isMusicPlaying?: boolean;
  fileName: string;
  currentMusicIndex?: number;
  websiteData: WebsiteData;
  compositionIndex?: number;
}

interface IGenerateActions {
  uploadFile: (file: any, fileName: string) => void;
  generateMusic: (requestObj: GenerateMusicRequestObj) => void;
  setDuration: (duration: number) => void;
  addNewTimeFrame: (id: number) => void;
  updateCurrentTimeFrameDetails: (id: number, duration: number) => void;
  updateMusicPlayingStatus: (playing: boolean) => void;
  setCurrentMusicSrc: (
    src: string,
    musicIndex: number,
    compositionIndex?: number
  ) => void;
  generateMusicForWebsite: (requestObj: GenerateMusicRequestObj) => void;
  resetWebsiteData: () => void;
  playNextTrack: () => void;
}

const initialState: IGenerateState = {
  timeFrameData: [],
  file: null,
  fileName: "Untitled File",
  status: API_STATUS_TYPES.idle,
  error: null,
  websiteData: {
    status: API_STATUS_TYPES.idle,
    musicUrls: [],
  },
  currentMusicIndex: 0,
};

type IGenerateStore = IGenerateState & IGenerateActions;

export const useGenerateStore = create<IGenerateStore>((set, get) => ({
  ...initialState,
  uploadFile: async (file: any, fileName: string) => {
    try {
      set(() => ({ status: API_STATUS_TYPES.loading }));
      const data = await uploadFileApi<object>(file);
      set(() => ({ status: API_STATUS_TYPES.success, file: data, fileName }));
    } catch (error: any) {
      set(() => ({ status: API_STATUS_TYPES.failed, error }));
    }
  },
  setDuration: (duration: number) => {
    set(() => ({ duration }));
  },
  setCurrentMusicSrc: (
    src: string,
    musicIndex: number,
    compositionIndex?: number
  ) => {
    set(() => ({
      currentMusicSrc: src,
      isMusicPlaying: true,
      compositionIndex: compositionIndex,
      currentMusicIndex: musicIndex,
    }));
  },
  updateMusicPlayingStatus: (playing: boolean) => {
    set(() => ({ isMusicPlaying: playing }));
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
  resetWebsiteData: () => {
    set(() => ({
      websiteData: {
        status: API_STATUS_TYPES.idle,
        musicUrls: [],
      },
      isMusicPlaying: false,
    }));
  },
  generateMusicForWebsite: async (requestObj: GenerateMusicRequestObj) => {
    try {
      set(() => ({
        websiteData: {
          status: API_STATUS_TYPES.loading,
        },
      }));
      const data: any = await generateMusicApi<object>({
        ...requestObj,
        duration: 10,
      });

      set(() => ({
        websiteData: {
          musicUrls: data?.urls,
          status: API_STATUS_TYPES.success,
        },
      }));
    } catch (error: any) {
      set(() => ({
        websiteData: {
          status: API_STATUS_TYPES.failed,
          error,
        },
      }));
    }
  },
  playNextTrack: () => {
    const compositionIndex = get().compositionIndex as number;
    const timeFrameData = get().timeFrameData;
    const currentTimeFrameId = get().currentTimeFrameId;
    const nextTimeFrameIndex =
      timeFrameData.findIndex((item) => item.id === currentTimeFrameId) + 1;
    const isNextTrackAvailable = timeFrameData.length >= nextTimeFrameIndex + 1;
    if (isNextTrackAvailable) {
      const nextMusicTrack =
        timeFrameData[nextTimeFrameIndex].generatedData?.urls[compositionIndex];
      return set(() => ({
        currentMusicSrc: nextMusicTrack,
        currentTimeFrameId: timeFrameData[nextTimeFrameIndex].id,
      }));
    }
    set(() => ({
      isMusicPlaying: false,
    }));
  },
}));
