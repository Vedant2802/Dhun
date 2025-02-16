import { create } from "zustand";
import {
  API_ENDPOINTS,
  API_STATUS_TYPES,
  AUTH_ENDPOINTS,
} from "../assets/constants/apiContants";

import {
  uploadFileApi,
  generateMusicApi,
  verifyOtp,
  setAccessToken,
  exportMusic,
  generateMusicTask,
  getGeneratedMusic
} from "../services/axiosService";

interface IUserTokenRequest {
  requestBody: object;
  AUTH_ENDPOINT: string;
}

export interface GenerateMusicRequestObj {
  referenceFileUrl?: string;
  instrument?: string;
  prompt?: string;
  genre?: string;
  tempo?: string;
  duration?: number;
  image_url?: string;
  email?: string;
  file_path?: string;
  generation_type?: string;
  file_name?: string;
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
  userData: any;
  exportedMusicData: any;
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
    musicIndex?: number,
    compositionIndex?: number
  ) => void;
  generateMusicForWebsite: (requestObj: GenerateMusicRequestObj) => void;
  generateMusicForWebsiteTask: (requestObj: GenerateMusicRequestObj) => void;
  resetWebsiteData: () => void;
  playNextTrack: () => void;
  getUserToken: ({ requestBody, AUTH_ENDPOINT }: IUserTokenRequest) => void;
  setUser: (user: any) => void;
  removeUser: () => void;
  uploadFileForWebsite: (file: any) => void;
  exportMusicData: (url: any) => void;
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
  userData: {
    status: API_STATUS_TYPES.idle,
  },
  exportedMusicData: {},
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

  uploadFileForWebsite: async (file: any) => {
    try {
      set(() => ({
        websiteData: {
          status: API_STATUS_TYPES.loading,
        },
      }));
      const data: any = await uploadFileApi<object>(file);
      const musicData: any = await generateMusicTask({
        generation_type: "melody-to-music",
        file_name: data?.file_name,
        prompt: "",
      });

      if(musicData?.message === "Task Submitted") {
        const task_id = musicData?.task_id;
        let status = '';
        while (status !== 'Completed') {
          try {
            const response: any = await getGeneratedMusic(task_id);
            status = response?.status;
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            if (response?.status === 'Completed') {
              set(() => ({
                websiteData: {
                  musicUrls: response?.urls,
                  status: API_STATUS_TYPES.success,
                },
              }));
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      // set(() => ({
      //   websiteData: {
      //     musicUrls: musicData?.urls,
      //     status: API_STATUS_TYPES.success,
      //   },
      // }));
    } catch (error: any) {
      set(() => ({
        websiteData: {
          status: API_STATUS_TYPES.failed,
        },
      }));
    }
  },

  setDuration: (duration: number) => {
    set(() => ({ duration }));
  },

  setCurrentMusicSrc: (
    src: string,
    musicIndex: number = 0,
    compositionIndex?: number
  ) => {
    set(() => ({
      currentMusicSrc: src,
      isMusicPlaying: true,
      currentMusicIndex: musicIndex,
    }));
    if (compositionIndex) {
      set(() => ({
        currentTimeFrameId: get().timeFrameData[0].id,
        compositionIndex: compositionIndex,
      }));
    } else {
      set(() => ({
        compositionIndex: 0,
        currentTimeFrameId: get().timeFrameData[0].id,
      }));
    }
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
        // duration: get().duration,
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
      });

      if (get().websiteData.status !== API_STATUS_TYPES.idle) {
        set(() => ({
          websiteData: {
            musicUrls: data?.urls,
            status: API_STATUS_TYPES.success,
          },
        }));
      }
    } catch (error: any) {
      set(() => ({
        websiteData: {
          status: API_STATUS_TYPES.failed,
          error,
        },
      }));
    }
  },

  generateMusicForWebsiteTask: async (requestObj: GenerateMusicRequestObj) => {
    try {
      set(() => ({
        websiteData: {
          status: API_STATUS_TYPES.loading,
        },
      }));
      const data: any = await generateMusicTask<object>({
        ...requestObj,
      });

      if(data?.message === "Task Submitted") {
        const task_id = data?.task_id;
        let status = '';
        while (status !== 'Completed') {
          try {
            const response: any = await getGeneratedMusic(task_id);
            status = response?.status;
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            if (response?.status === 'Completed') {
              set(() => ({
                websiteData: {
                  musicUrls: response?.urls,
                  status: API_STATUS_TYPES.success,
                },
              }));
            }
          } catch (error) {
            console.log(error)
          }
        }
      }

      // if (get().websiteData.status !== API_STATUS_TYPES.idle) {
      //   set(() => ({
      //     websiteData: {
      //       musicUrls: data?.urls,
      //       status: API_STATUS_TYPES.success,
      //     },
      //   }));
      // }
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
        isMusicPlaying: true,
      }));
    } else {
      set(() => ({
        isMusicPlaying: false,
      }));
    }
  },
  
  getUserToken: async ({ requestBody, AUTH_ENDPOINT }: IUserTokenRequest) => {
    set(() => ({
      status: API_STATUS_TYPES.loading,
    }));
    const user = await verifyOtp({ AUTH_ENDPOINT, requestBody });
    if (AUTH_ENDPOINT == API_ENDPOINTS.verifyOtp) {
      set(() => ({
        userData: {
          data: user,
          status: API_STATUS_TYPES.success,
        },
      }));
      setAccessToken(user?.token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      set(() => ({
        userData: {
          status: API_STATUS_TYPES.success,
        },
      }));
    }
  },
  exportMusicData: async (url: any) => {
    const exportedMusic = await exportMusic(url);
    set(() => ({
      exportedMusicData: {
        data: exportedMusic,
      },
    }));
  },
  setUser: (user: any) => {
    set(() => ({
      userData: {
        data: user,
        status: API_STATUS_TYPES.success,
      },
    }));
    setAccessToken(user?.token);
  },
  removeUser: () => {
    set(() => ({
      userData: {
        data: null,
        status: API_STATUS_TYPES.idle,
      },
    }));
    localStorage.removeItem("user");
  },
}));
