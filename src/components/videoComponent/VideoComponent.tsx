import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoComponent.module.scss";
import playIcon from "../../../public/icons/playIcon.svg";
import pauseIcon from "../../../public/icons/pausegrey.svg";

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const videoRef = useRef(null);

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
        src="public/video/video.mp4"
        width="100%"
        onClick={playVideoPlayer}
      >
        Sorry, your browser doesn't support embedded videos and watch it with
        your favorite video player!
      </video>
      {isVisible && (
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt="playIcon"
          onClick={playVideoPlayer}
          className={styles.playPause}
        />
      )}
    </div>
  );
};

export default VideoComponent;
