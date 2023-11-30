import "video.js/dist/video-js.css";
import videojs from "video.js";
import { useEffect, useRef, useState } from "react";
import "./VideoPlayer.scss";
import playIcon from "../../../public/icons/playIcon.svg";
import pauseIcon from "../../../public/icons/pause.svg";
import volumeIcon from "../../../public/icons/volumeIcon.svg";
import volumeMute from "../../../public/icons/volumeMute.svg";
import * as React from "react";

interface videoUrlProps {
  videoUrl: string;
}
const VideoPlayer: React.FC<videoUrlProps> = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const videoPlayer = videojs(videoRef.current);
      videoPlayer.src({
        src: videoUrl,
      });
      videoPlayer.play();
      setIsPlaying(true);
    }
  }, [videoUrl]);

  const playVideoPlayer = () => {
    if (videoRef.current) {
      const videoPlayer = videojs(videoRef.current);
      if (isPlaying) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
      setIsPlaying((prev: boolean) => !prev);
    }
  };

  const controlVolume = () => {
    if (videoRef.current) {
      const videoPlayer = videojs(videoRef.current);
      if (isMuted) {
        videoPlayer.volume(1);
      } else {
        videoPlayer.volume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <video className="video-js" width="100%" height="auto" ref={videoRef} />
      <div className="videoControls">
        <img
          src={isMuted ? volumeMute : volumeIcon}
          alt="volumeIcon"
          onClick={controlVolume}
          className="volumeControl"
        />
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt="playIcon"
          onClick={playVideoPlayer}
          className="playPause"
        />
      </div>
    </>
  );
};

export default VideoPlayer;
