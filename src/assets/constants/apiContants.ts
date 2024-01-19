export enum API_STATUS_TYPES {
  idle = "idle",
  loading = "loading",
  success = "success",
  failed = "failed",
}

export enum AUTH_ENDPOINTS {
  register = "/api/auth/register",
  login = "/api/auth/login",
}

export enum API_ENDPOINTS {
  uploadVideo = "/api/upload",
  generateMusicV4 = "/api/v4/music_studio/generate",
  generateMusicV3 = "/api/v3/music_studio/generate",
  generateTask = "/api-test/music_studio/generate",
  getGeneratedStatus = "/api-test/status/",
  contactus = "/api/contactus",
  exportMusic = "/api/utils/combineaudio"
}
