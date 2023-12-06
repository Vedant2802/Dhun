import React, { useEffect, useState } from "react";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./WebModal.module.scss";
import playIcon from "../../../public/icons/play.svg";
import pauseIcon from "../../../public/icons/pauseWhite.svg";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import dhunAI from "../../../public/video/rrradhun.mp4";
import closeicon from "../../../public/icons/cross-circle.svg";

enum DEFAULT_PROMPTS {
  prompt1 = "Upbeat, spiritual music",
  prompt2 = "Indian, soulful, timeless, melody",
}

const defaultReqObj = {
  email: "test@gmail.com",
  image_url: "",
};

type webmodalprops = {
  closePopup: Function
}

const WebModal = ({closePopup}: webmodalprops) => {
  const [prompt, setPrompt] = useState<string>("");
  const [isChibBtn1Selected, setChibBtn1Selected] = useState<boolean>(false);
  const [isChibBtn2Selected, setChibBtn2Selected] = useState<boolean>(false);
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
    generateMusic({ ...defaultReqObj, prompt });
  };

  useEffect(() => {
    if (isChibBtn1Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt1 });
    }
    if (isChibBtn2Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt2 });
    }
  }, [isChibBtn1Selected, isChibBtn2Selected]);

  const chibBtnStyle = (selected: boolean) => {
    if (prompt) {
      return styles.overlayBtn;
    }
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
            className={styles.chip2}
            onClick={() => togglePlay(musicUrls[1])}
          >
            <img src={getMusicIcon(musicUrls[1])} alt="playIcon" />
            <div>Track 2</div>
          </div>
          <div
            className={styles.chip3}
            onClick={() => togglePlay(musicUrls[2])}
          >
            <img src={getMusicIcon(musicUrls[2])} alt="playIcon" />
            <div>Track 3</div>
          </div>
          <div className={styles.createButton} onClick={resetState}>
            Recreate
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <dialog className={styles.webDialog}>
      <img className={styles.closeIcon} src={closeicon} onClick={() => closePopup(false)} />
      <form className={styles.generatePopup} onSubmit={handleOnSubmit}>
        <div className={styles.topCard}>
          {/* <div className={styles.videoPart}> */}
          <video autoPlay width="auto" muted loop>
            <source src={dhunAI} type="video/mp4" />
          </video>
          {/* </div> */}
        </div>
        {status === API_STATUS_TYPES.success && musicUrls?.length ? (
          renderMusicUrls()
        ) : (
          <div className={styles.chipWrapper}>
            {status === API_STATUS_TYPES.loading ? (
              renderLoadingBtns()
            ) : (
              <>
                <div>
                  <input
                    name="prompt"
                    className={styles.chip}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What melody do you want to create? "
                  />
                </div>
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
                  className={chibBtnStyle(isChibBtn2Selected)}
                  onClick={(e) => {
                    e.preventDefault();
                    setChibBtn2Selected(!isChibBtn2Selected);
                  }}
                >
                  Indian, soulful, timeless, melody
                </button>
              </>
            )}
            <button type="submit" className={styles.createButton}>
              {status === API_STATUS_TYPES.loading ? "Generating..." : "Create"}
            </button>
          </div>
        )}
      </form>
      <AudioPlayer />
    </dialog>
  );
};

export default WebModal;
