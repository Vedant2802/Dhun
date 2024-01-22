import React, { useEffect, useRef, useState } from "react";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./WebModal.module.scss";
import playIcon from "../../../public/icons/play.svg";
import pauseIcon from "../../../public/icons/pauseWhite.svg";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import closeicon from "../../../public/icons/close.svg";
import musicbutton from "../../../public/icons/music-button.svg";
import uploadbutton from "../../../public/icons/upload-button.svg";
import stopCreatingSvg from "../../../public/icons/stopCreating.svg";

enum UPLOADED_DEFAULT_MUSIC_REFERENCES {
  brunoMars = "http://dhun.centralindia.cloudapp.azure.com/storage/grenade 2.wav",
  gotMusic = "http://dhun.centralindia.cloudapp.azure.com/storage/Game of thrones 1.wav",
}

enum DEFAULT_PROMPTS {
  prompt1 = "Upbeat, spiritual music",
  prompt2 = "Indian, soulful, timeless, melody",
  prompt3 = "Upbeat, spiritual music, Upbeat music",
  prompt4 = "Indian,Soul",
}

const defaultReqObj = {
  generation_type: "text-to-music",
  file_name: "",
};

type webmodalprops = {
  closePopup: Function;
};

const WebModal = ({ closePopup }: webmodalprops) => {
  const [prompt, setPrompt] = useState<string>("");
  const [isChibBtn1Selected, setChibBtn1Selected] = useState<boolean>(false);
  const [isChibBtn2Selected, setChibBtn2Selected] = useState<boolean>(false);
  const [fileSizeError, setFileSizeError] = useState("");
  const [fileName, setFileName] = useState("");
  const videoRef: any = useRef<any>(null);
  const [videoPath, setVideoPath] = useState("");
  const uploadFileForWebsite = useGenerateStore(
    (state) => state.uploadFileForWebsite
  );
  const setUser = useGenerateStore((state) => state.setUser);
  const generateMusic = useGenerateStore(
    (state) => state.generateMusicForWebsiteTask
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
    generateMusic({ ...defaultReqObj, prompt });
  };

  const onFileUpload = (event: any) => {
    // if (event.target.files[0].size > 10485760) {
    //   setFileSizeError("Kindly upload a file under 10mb");
    //   return;
    // }
    const FormD: any = new FormData();
    const fileName = event.target.files[0].name;
    setFileName(fileName);
    setFileSizeError("");
    FormD.append("file", event.target.files[0]);
    uploadFileForWebsite(FormD);
  };

  const audioUpload = (audio: string) => {
    if (audio === "GOT") {
      generateMusic({
        ...defaultReqObj,
        prompt: prompt || "upbeat, neutral, driving",
      });
    } else {
      generateMusic({
        ...defaultReqObj,
        prompt:
          prompt ||
          "joyful, medium tempo, high pitch, classical, sitar, tabla, harmonium, uplifting, melodic, rhythmic",
      });
    }
  };

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

  const chibBtnStyle = (selected: boolean) => {
    // if (prompt) {
    //   return styles.overlayBtn;
    // }
    return selected ? styles.chibBtnActive : styles.chipBtn;
  };

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
    setPrompt("");
    setFileName("");
    setVideoPath("");
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
                <p className={styles.topCardText}>Create text &rarr; music</p>
              </div>

              <button className={styles.closeIconWrapper}>
                <img
                  className={styles.closeIcon}
                  src={closeicon}
                  onClick={() => closePopup(false)}
                />
              </button>
            </div>

            {/* {status === API_STATUS_TYPES.success && (
              <div className={styles.uploadButton}>
                <img src={uploadbutton} />
                <span>Upload your own video </span>
                <input
                  type="file"
                  id="uploadVideo"
                  name="filename"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={onVideoFileUpload}
                  className={styles.videoUpload}
                />
              </div>
            )} */}
            {/* {status === API_STATUS_TYPES.loading && (
              <div className={styles.uploadButton}>
                <span className={styles.generating}> Generating . . . </span>
              </div>
            )} */}
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
                    <div className={styles.chip}>
                      <input
                        name="prompt"
                        className={styles.chipInput}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="What melody do you wish to create? "
                      />
                      <div
                        className={styles.musicButton}
                        onClick={(e) => handleOnSubmit(e)}
                      >
                        <img src={musicbutton} />
                        <div className={styles.generate}>Generate</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className={styles.suggestiontext}>Suggestions</p>
                    <div className={styles.suggestionbtns}>
                      <button
                        className={chibBtnStyle(isChibBtn1Selected)}
                        onClick={(e) => {
                          e.preventDefault();
                          setChibBtn1Selected(!isChibBtn1Selected);
                        }}
                      >
                        Upbeat, spiritual music
                      </button>
                      <button
                        className={`${chibBtnStyle(isChibBtn2Selected)} ${
                          styles.chipbtn24
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setChibBtn2Selected(!isChibBtn2Selected);
                        }}
                      >
                        Indian, soulful, timeless, melody
                      </button>
                      <button
                        className={`${chibBtnStyle(isChibBtn1Selected)} ${
                          styles.chipbtn3
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setChibBtn1Selected(!isChibBtn1Selected);
                        }}
                      >
                        Upbeat, spiritual music, Upbeat music
                      </button>
                      <button
                        className={`${chibBtnStyle(isChibBtn1Selected)} ${
                          styles.chipbtn24
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setChibBtn1Selected(!isChibBtn1Selected);
                        }}
                      >
                        Indian, soul
                      </button>
                    </div>
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

export default WebModal;
