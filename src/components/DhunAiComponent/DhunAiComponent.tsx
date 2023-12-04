import React, { useState, useEffect } from "react";
import styles from "./DhunAiComponent.module.scss";
// import dhunAI from "../../../public/video/dhunAI.mp4";
import arrow from "../../../public/icons/right-arrow.svg";
import volumeUp from "../../../public/icons/volumeIcon.svg";
import promptVideo from "../../../public/video/promptVideo.mp4";
import WebModal from "../webGenerateModal/WebModal";
import { createPortal } from "react-dom";
import dhunAI from "../../../public/video/rrradhun.mp4";
import audio1 from "../../../public/video/anger.wav";
import audio2 from "../../../public/video/anticipation.wav";
import { useGenerateStore } from "../../stores/generateStore";
import AudioPlayer from "../audioPlayer/AudioPlayer";

const DhunAiComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const setCurrentMusicSrc = useGenerateStore(
    (state) => state.setCurrentMusicSrc
  );
  const currentMusicSrc = useGenerateStore((state) => state.currentMusicSrc);
  const updateMusicPlayingStatus = useGenerateStore(
    (state) => state.updateMusicPlayingStatus
  );
  const isMusicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const openPrompt = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: any) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  const handlePromptOnClick = (musicSrc: string) => {
    if (currentMusicSrc === musicSrc && isMusicPlaying) {
      return updateMusicPlayingStatus(false);
    }
    setCurrentMusicSrc(musicSrc);
  };
  const getBtnStyle = (musicSrc: string) => {
    if (currentMusicSrc === musicSrc && isMusicPlaying) {
      return styles.active;
    }
    return styles.contentButton;
  };
  console.log("currentMusicSrc", currentMusicSrc);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.detailDhunai}>
        <div className={styles.heading}>Craft Symphonies with a Click!</div>
        <div className={styles.title}>
          Endless possibilities with Dhun.AI
          <br />
          to turn your thoughts into magical
          <br /> melodies.
        </div>
        <div className={styles.button} onClick={openPrompt}>
          Create magic now <img className={styles.arrow} src={arrow} />
        </div>
      </div>
      {openModal && createPortal(<WebModal />, document.body)}
      <div className={styles.videoContainer}>
        <div className={styles.videoPart}>
          <video autoPlay width="auto" muted loop>
            <source src={dhunAI} type="video/mp4" />
          </video>
        </div>
        <div className={styles.videoSelection}>
          <div
            className={getBtnStyle(audio1)}
            onClick={() => handlePromptOnClick(audio1)}
          >
            <span className={styles.promptText}>Prompt :</span> Fierce scene
            with Anger, Greatness & Patriotism
          </div>
          <div
            className={getBtnStyle(audio2)}
            onClick={() => handlePromptOnClick(audio2)}
          >
            <span className={styles.promptText}>Prompt :</span> Intence scene
            with Confidence & Aggression
          </div>
          {/* <div
            className={styles.contentButton}
            onClick={() => handlePromptOnClick(audio1)}
          >
            Political moment that ends up in a win
          </div>
          <div
            className={styles.contentButton}
            onClick={() => handlePromptOnClick(audio2)}
          >
            Political moment that ends up in a win
          </div> */}
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
};

export default DhunAiComponent;
