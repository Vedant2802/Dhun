import React, { useEffect, useRef, useState } from "react";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./WebModal.module.scss";
import playIcon from "../../../public/icons/play.svg";
import pauseIcon from "../../../public/icons/pauseWhite.svg";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import closeicon from "../../../public/icons/close.svg";
import likeIcon from "../../../public/icons/likeIcon.svg";
import dislikeIcon from "../../../public/icons/dislikeIcon.svg";
import shareIcon from "../../../public/icons/shareIcon.svg";
import musicbutton from "../../../public/icons/music-button.svg";
import stopCreatingSvg from "../../../public/icons/stopCreating.svg";
import { Player } from "@lottiefiles/react-lottie-player";

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
  const videoRef: any = useRef<any>(null);
  const [videoPath, setVideoPath] = useState("");
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

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const handleShareClick = async (url: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    try {
      // Use the 'url' parameter
      await navigator.clipboard.writeText(url);
      setIsLinkCopied(true);

      setTimeout(() => {
        setIsLinkCopied(false);
      }, 30000);
      console.log("Link copied to clipboard:", url);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy link. Please try again.");
    }
  };
  console.log("first", isLinkCopied);

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
    resetState();
  }, []);

  const chibBtnStyle = (selected: boolean) => {
    return selected ? styles.chibBtnActive : styles.chipBtn;
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
          {isLinkCopied && (
            <div className={styles.linkCopiedPopup}>
              Link copied to clipboard!
            </div>
          )}
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[0])}
          >
            <img src={getMusicIcon(musicUrls[0])} alt="playIcon" />
            <div>Track 1</div>
            <div className={styles.iconsWrapper}>
              <div
                className={styles.iconWrapper}
                data-tooltip="Share"
                onClick={(e) => handleShareClick(musicUrls[0], e)}
              >
                <img src={shareIcon} alt="Share" />
              </div>
              <img src={likeIcon} alt="Like" />
              <img src={dislikeIcon} alt="Dislike" />
            </div>
          </div>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[1])}
          >
            <img src={getMusicIcon(musicUrls[1])} alt="playIcon" />
            <div>Track 2</div>
            <div className={styles.iconsWrapper}>
              <div
                className={styles.iconWrapper}
                data-tooltip="Share"
                onClick={(e) => handleShareClick(musicUrls[1], e)}
              >
                <img src={shareIcon} alt="Share" />
              </div>
              <img src={likeIcon} alt="Like" />
              <img src={dislikeIcon} alt="Dislike" />
            </div>
          </div>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[2])}
          >
            <img src={getMusicIcon(musicUrls[2])} alt="playIcon" />
            <div>Track 3</div>
            <div className={styles.iconsWrapper}>
              <div
                className={styles.iconWrapper}
                data-tooltip="Share"
                onClick={(e) => handleShareClick(musicUrls[2], e)}
              >
                <img src={shareIcon} alt="Share" />
              </div>
              <img src={likeIcon} alt="Like" />
              <img src={dislikeIcon} alt="Dislike" />
            </div>
          </div>
          <div className={styles.createButton} onClick={resetState}>
            Create more music
          </div>
        </div>
      );
    }
    return null;
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
                {/* <p className={styles.closeIconwhite}></p> */}
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
          </div>
        )}
        {status === API_STATUS_TYPES.success && musicUrls?.length ? (
          renderMusicUrls()
        ) : (
          <>
            <div className={styles.chipWrapper}>
              {status === API_STATUS_TYPES.loading ? (
                <>
                  <Player
                    src="https://amlzee5sbci1mu5120768980.blob.core.windows.net/dhunai/visualization1.json?sp=r&st=2024-01-29T08:08:31Z&se=2025-01-01T16:08:31Z&sv=2022-11-02&sr=b&sig=%2BdhuFDIA4l8f35Rq5Mar1GhNMDq1DNA5HxZ6YTkltu4%3D"
                    className="player"
                    loop
                    autoplay
                    style={{ height: "200px", width: "100%" }}
                  />
                  <div className={styles.stopCreatingBtn}>
                    Generating your music tracks...
                  </div>
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
                        <img src={musicbutton} alt="musicIcon" />
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
                        <p className={styles.buttonText}>
                          Create a rock anthem tailored for a charismatic actor
                          portraying a rockstar, capturing their on-stage energy
                          and magnetic presence
                        </p>
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
                        <p className={styles.buttonText}>
                          Create an energetic dance track featuring electric
                          guitar riffs
                        </p>
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
                        <p className={styles.buttonText}>
                          A suspenseful tale of walking alone at night, feeling
                          an eerie presence behind you, heartbeat racing with
                          fear and tension
                        </p>
                      </button>
                      {/* <button
                        className={`${chibBtnStyle(isChibBtn1Selected)} ${
                          styles.chipbtn24
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setChibBtn1Selected(!isChibBtn1Selected);
                        }}
                      >
                        Indian, soul
                      </button> */}
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
