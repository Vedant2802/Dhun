import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoComponent.module.scss";
import playIcon from "../../../public/icons/playIcon.svg";
import pauseIcon from "../../../public/icons/pausegrey.svg";
import thumbnail from "../../../public/icons/thumbnail.png";

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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

  return (
    <div className={styles.video}>
      <video
        ref={videoRef}
        poster={thumbnail}
        src="https://amlzee5sbci1mu5120768980.blob.core.windows.net/dhunai/DHUN_VIDEO_FINAL.mp4?sp=r&st=2024-01-19T10:55:05Z&se=2024-12-31T18:55:05Z&sv=2022-11-02&sr=b&sig=vGS2O9%2FBWyMevhHpyE7py44ew6PdY9onb5zjpkJOG1Y%3D"
        width="100%"
        height="100vh"
        onClick={playVideoPlayer}
      >
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
      <div className={styles.topContainer}>
        <div className={styles.heading}>
          <span className={styles.topHeading}>
            {" "}
            Make professional-quality music at speed with AI
          </span>
          <span className={styles.bottomHeading}>
            India’s 1st FMM that makes music in classical, Bollywood & 20+
            genres 
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
