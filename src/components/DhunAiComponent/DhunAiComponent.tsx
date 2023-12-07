import React, { useState, useEffect, useRef } from "react";
import styles from "./DhunAiComponent.module.scss";
import WaveSurfer from "wavesurfer.js";
import arrow from "../../../public/icons/right-arrow.svg";
import volumeUp from "../../../public/icons/volumeIcon.svg";
import volumeMute from "../../../public/icons/volumeMute.svg";
import promptVideo from "../../../public/video/promptVideo.mp4";
import WebModal from "../webGenerateModal/WebModal";
import { createPortal } from "react-dom";
import dhunAI from "../../../public/video/rrradhun.mp4";
import audio1 from "../../../public/video/anger.wav";
import audio2 from "../../../public/video/anticipation.wav";
import { useGenerateStore } from "../../stores/generateStore";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { useNavigate } from "react-router";

const DhunAiComponent = () => {
  const waveformRef = useRef<WaveSurfer | null>(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const userData = useGenerateStore((state) => state.userData);
  const setUser = useGenerateStore((state) => state.setUser);
  const [volume, setVolume] = useState(1);
  const videoElements = document.querySelector("video");
  const [isMuted, setIsMuted] = useState(false);
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
    if (userData?.data) {
      setOpenModal(true);
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: any) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKeyPress);
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  useEffect(() => {
    const WaveSurferParams: any & { loop?: boolean } = {
      container: "#waveform",
      progressColor: "#FCEF79",
      waveColor: "rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)",
      height: 55,
      normalize: true,
      loop: true,
      cursorColor: "#ddd5e9",
      cursorWidth: 2,
      barWidth: 4,
      barGap: 3,
      barRadius: 100,
      barHeight: 1,
      minPxPerSec: 1,
      backend: "MediaElement",
      media: videoElements as any,
    };

    waveformRef.current = WaveSurfer.create(WaveSurferParams);
    waveformRef.current.load(dhunAI);
    waveformRef.current.on("ready", () => {
      waveformRef.current?.play();
    });
    return () => {
      waveformRef.current?.destroy();
      const videoElement: any = videoRef.current;
      if (videoElement) {
        videoElement.pause();
      }
      videoRef.current = null;
    };
  }, [dhunAI]);

  // useEffect(() => {
  //   const videoElement: any = videoRef.current;
  //   if (videoElement) {
  //     videoElement.play();
  //   }
  //   if (waveformRef?.current) {
  //     waveformRef.current.play();
  //   }
  // }, [waveformRef.current, videoRef.current]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const videoElement: any = videoRef.current;
      if (waveformRef?.current && videoElement) {
        waveformRef.current.play();
        videoElement.play();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [waveformRef?.current, videoRef.current]);

  const handlePlayOriginal = () => {
    updateMusicPlayingStatus(false);
    const videoElement: any = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
    if (waveformRef?.current) {
      waveformRef.current.play();
    }
    // return styles.active;
  };

  const handlePromptOnClick = (musicSrc: string) => {
    if (currentMusicSrc === musicSrc && isMusicPlaying) {
      return updateMusicPlayingStatus(false);
    }
    restartVideo();
    setCurrentMusicSrc(musicSrc);
  };

  const restartVideo = () => {
    const videoElement: any = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
    if (waveformRef?.current) {
      waveformRef.current.play();
    }
  };

  const getBtnStyle = (musicSrc: string) => {
    if (currentMusicSrc === musicSrc && isMusicPlaying) {
      return styles.active;
    }
    return styles.contentButton;
  };

  const volumeControl = () => {
    debugger;
    if (waveformRef?.current) {
      const newIsMuted = !isMuted;
      console.log("newIsMuted", newIsMuted);
      setIsMuted(newIsMuted);
      waveformRef.current?.setVolume(isMuted ? 0 : 1);
    }
  };

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
      {openModal &&
        userData?.data &&
        createPortal(<WebModal closePopup={setOpenModal} />, document.body)}
      <div className={styles.videoContainer}>
        <div className={styles.videoPart}>
          <video ref={videoRef} autoPlay width="auto" muted loop>
            <source src={dhunAI} type="video/mp4" />
          </video>
          <div className={styles.controls}>
            <div className={styles.volume} onClick={volumeControl}>
              <img src={isMuted ? volumeUp : volumeMute} alt="volumeIcon" />
            </div>
            <div className={styles.visualitation} id="waveform"></div>
          </div>
        </div>
        <div className={styles.videoSelection}>
          <div
            className={isMusicPlaying ? styles.contentButton : styles.active}
            onClick={() => handlePlayOriginal()}
          >
            Original audio
          </div>
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
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
};

export default DhunAiComponent;
