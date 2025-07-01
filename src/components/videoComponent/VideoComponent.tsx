import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoComponent.module.scss";
// import playIcon from "../../../public/icons/playIcon.svg";
import pauseIcon from "../../../public/icons/pausegrey.svg";
import thumbnail from "../../../public/icons/thumbnail.png";
import volumeIcon from "../../../public/icons/volumeIcon.svg";
import muteIcon from "../../../public/icons/muteIcon.svg";

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideoPlayer = () => {
    setIsPlaying((prev: boolean) => !prev);
    setIsVisible((prev: boolean) => !prev);
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  const isSmallScreen = () => window.innerWidth <= 600;

  const toggleMute = () => {
    setIsMuted((prev: boolean) => !prev);
    videoRef.current!.muted = !isMuted;
  };

  return (
    <div className={styles.video}>
      <video
        className={styles.video}
        ref={videoRef}
        poster={thumbnail}
        width="100%"
        height="100vh"
        onClick={playVideoPlayer}
        onError={(e) => {
          const video = e.currentTarget;
          if (video.error) {
            console.error(
              `Video error code: ${video.error.code}, message: ${video.error.message}`
            );
          } else {
            console.error("Unknown video error");
          }
        }}
      >
        <source src="/video/hummed.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos and watch it with
        your favorite video player!
      </video>
      {isVisible && (
        <img
          src={pauseIcon}
          alt="playIcon"
          onClick={playVideoPlayer}
          className={styles.playPause}
        />
      )}
      {isPlaying && (
        <img
          src={isMuted ? muteIcon : volumeIcon}
          alt="muteIcon"
          onClick={toggleMute}
          className={styles.muteButton}
        />
      )}

      <div className={styles.topContainer}>
        <div
          className={styles.heading}
          style={{
            display: isPlaying && !isSmallScreen() ? "none" : "flex",
          }}
        >
          <span className={styles.topHeading}>
            {" "}
            Make professional-quality music at speed with AI
          </span>
          <span className={styles.bottomHeading}>
            India's 1st FMM that makes music in classical, Bollywood & 20+
            genres 
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
