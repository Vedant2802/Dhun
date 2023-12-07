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
  const videoElement = document.querySelector("video");
  const [volume, setVolume] = useState(1);
  const track =
    "http://10.39.255.16:3000/storage/sample_960x400_ocean_with_audio (1).mp3";
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

  // useEffect(() => {
  //   const videoElement: any = videoRef.current;
  //   if (videoElement) {
  //     videoElement.play();
  //   }
  // }, []);

  const waveformParams = {
    container: "#waveform",
    progressColor: "#FCEF79",
    waveColor: "rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)",
    height: 55,
    normalize: true,
    cursorColor: "#ddd5e9",
    cursorWidth: 2,
    barWidth: 4,
    barGap: 3,
    barRadius: 100,
    barHeight: 1,
    minPxPerSec: 1,
    backend: "MediaElement",
    media: videoElement as any,
    url: dhunAI,
  };

  useEffect(() => {
    if (waveformRef.current) {
      waveformRef.current?.destroy();
    }
    waveformRef.current = WaveSurfer.create(waveformParams as any);
  }, [dhunAI]);

  // useEffect(() => {
  //   const videoElement: any = videoRef.current;
  //   videoElement.play();

  //   const timeoutId = setTimeout(() => {
  //     if (waveformRef?.current && videoElement) {
  //       waveformRef.current.play();
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [waveformRef?.current]);

  const handlePlayOriginal = () => {
    const videoElement: any = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
    if (waveformRef?.current) {
      waveformRef.current.play();
    }
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
    if (videoElement && waveformRef?.current) {
      videoElement.currentTime = 0;
      videoElement.play();
      waveformRef?.current.play();
    }
  };

  const getBtnStyle = (musicSrc: string) => {
    if (currentMusicSrc === musicSrc && isMusicPlaying) {
      return styles.active;
    }
    return styles.contentButton;
  };

  const volumeControl = () => {
    if (videoElement) {
      const newVolume = videoElement.muted ? 1 : 0;
      setVolume(newVolume);
      videoElement.volume = newVolume;
      videoElement.muted = !videoElement.muted;
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
          <video ref={videoRef} autoPlay width="auto" loop>
            <source src={dhunAI} type="video/mp4" />
          </video>
          <div className={styles.controls}>
            <div className={styles.volume} onClick={volumeControl}>
              <img src={volume ? volumeUp : volumeMute} alt="volumeIcon" />
            </div>
            <div className={styles.visualitation} id="waveform"></div>
          </div>
        </div>
        <div className={styles.videoSelection}>
          <div className={styles.active} onClick={() => handlePlayOriginal()}>
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
