import React, { useEffect, useRef, useState } from "react";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./webModal4.module.scss";
import playIcon from "../../../public/icons/play.svg";
import pauseIcon from "../../../public/icons/pauseWhite.svg";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import closeicon from "../../../public/icons/close.svg";
import stopCreatingSvg from "../../../public/icons/stopCreating.svg";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

enum DEFAULT_PROMPTS {
  prompt1 = "Upbeat, spiritual music",
  prompt2 = "Indian, soulful, timeless, melody",
  prompt3 = "Upbeat, spiritual music, Upbeat music",
  prompt4 = "Indian,Soul",
}

const defaultReqObj = {
  generation_type: "Hmm-to-music",
};

type webmodalprops = {
  closePopup: Function;
};

const WebModal4 = ({ closePopup }: webmodalprops) => {
  const [isChibBtn1Selected, setChibBtn1Selected] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");
  const [isChibBtn2Selected, setChibBtn2Selected] = useState<boolean>(false);
  const videoRef: any = useRef<any>(null);
  const [videoPath, setVideoPath] = useState("");
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    setFilePath(audio.src);
  };

  const setUser = useGenerateStore((state) => state.setUser);
  const generateMusic = useGenerateStore(
    (state) => state.generateMusicForWebsite
  );
  const setCurrentMusicSrc = useGenerateStore(
    (state) => state.setCurrentMusicSrc
  );
  const updateMusicPlayingStatus = useGenerateStore(
    (state) => state.updateMusicPlayingStatus
  );
  const currentMusicSrc = useGenerateStore((state) => state.currentMusicSrc);
  const isMusicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const resetWebsiteData = useGenerateStore((state) => state.resetWebsiteData);
  const { status, musicUrls } = useGenerateStore((state) => ({
    status: state.websiteData.status,
    musicUrls: state.websiteData.musicUrls,
  }));

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    filePath &&
      generateMusic({
        generation_type: "Hmm-to-music",
        prompt: "",
        file_name: filePath,
      });
  }, [filePath]);

  useEffect(() => {
    if (isChibBtn1Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt1 });
    }
    if (isChibBtn2Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt2 });
    }
  }, [isChibBtn1Selected, isChibBtn2Selected]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    if (user) {
      setUser(user);
    }
  }, []);

  const renderLoadingBtns = () => {
    return Array(3)
      .fill("")
      .map((_, index: number) => {
        return <div key={index} className={styles.loadingBtn}></div>;
      });
  };

  const togglePlay = (musicSrc: string) => {
    if (isMusicPlaying && currentMusicSrc === musicSrc) {
      return updateMusicPlayingStatus(false);
    }
    setCurrentMusicSrc(musicSrc);
  };

  const resetState = () => {
    resetWebsiteData();
    setChibBtn1Selected(false);
    setChibBtn2Selected(false);
    setVideoPath("");
    setFilePath("");
  };

  const getMusicIcon = (musicSrc: string) => {
    return musicSrc === currentMusicSrc && isMusicPlaying
      ? pauseIcon
      : playIcon;
  };

  const renderMusicUrls = () => {
    if (musicUrls && musicUrls.length) {
      return (
        <div className={styles.loadingChip}>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[0])}
          >
            <img src={getMusicIcon(musicUrls[0])} alt="playIcon" />
            <div>Track 1</div>
          </div>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[1])}
          >
            <img src={getMusicIcon(musicUrls[1])} alt="playIcon" />
            <div>Track 2</div>
          </div>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[2])}
          >
            <img src={getMusicIcon(musicUrls[2])} alt="playIcon" />
            <div>Track 3</div>
          </div>
          <div className={styles.createButton} onClick={resetState}>
            Create more music
          </div>
        </div>
      );
    }
    return null;
  };

  const renderVideo = () => {
    if (videoPath) {
      return (
        <video ref={videoRef} width="auto" muted loop>
          <source src={videoPath} type="video/mp4" />
        </video>
      );
    }
    return null;
  };

  const onVideoFileUpload = (input: any) => {
    const file = input.target?.files[0];
    const fileURL = URL.createObjectURL(file);
    setVideoPath(fileURL);
  };

  useEffect(() => {
    if (currentMusicSrc && isMusicPlaying && videoRef?.current) {
      videoRef.current.currentTime = 0;
      videoRef?.current?.play();
    }
    if (!isMusicPlaying && videoRef?.current) {
      videoRef?.current?.pause();
    }
  }, [currentMusicSrc, isMusicPlaying]);

  return (
    <dialog className={styles.webDialog}>
      <form className={styles.generatePopup} onSubmit={handleOnSubmit}>
        {renderVideo()}
        {!videoPath && (
          <div
            className={`${styles.topCard} ${
              ((musicUrls && musicUrls?.length > 0) ||
                status === API_STATUS_TYPES.loading) &&
              `${styles.topcardloaded}`
            }  `}
          >
            <div className={styles.topCardDiv}>
              <div className={styles.topDiv}>
                <p className={styles.closeIconwhite}></p>
                <p className={styles.topCardText}>Turn humming &rarr; music</p>
              </div>

              <button className={styles.closeIconWrapper}>
                <img
                  className={styles.closeIcon}
                  src={closeicon}
                  onClick={() => closePopup(false)}
                />
              </button>
            </div>
          </div>
        )}
        {status === API_STATUS_TYPES.success && musicUrls?.length ? (
          renderMusicUrls()
        ) : (
          <>
            <div className={styles.chipWrapper}>
              {status === API_STATUS_TYPES.loading ? (
                <>
                  {renderLoadingBtns()}
                  <button
                    className={styles.stopCreatingBtn}
                    onClick={() => resetState()}
                  >
                    <img src={stopCreatingSvg} alt="stop creating" />
                    Stop creating
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.chipinputwrapper}>
                    <button className={styles.chip}>
                      <AudioRecorder
                        onRecordingComplete={(blob) => addAudioElement(blob)}
                        recorderControls={recorderControls}
                      />
                      <span>Start Humming</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </form>
      <AudioPlayer />
    </dialog>
  );
};

export default WebModal4;
