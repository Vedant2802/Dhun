import "video.js/dist/video-js.css";
import videojs from "video.js";
import { useEffect, useRef } from "react";
import "./VideoPlayer.scss";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const videoUrl =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  console.log("videoUrl", videoUrl);
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const videoPlayer = videojs(videoRef.current);
      videoPlayer.src({
        src: videoUrl,
      });
      videoPlayer.play();
    }
  }, [videoUrl]);

  return (
    <>
      <video
        className="video-js"
        width="100%"
        height="auto"
        controls
        ref={videoRef}
        muted
      />
    </>
  );
};

export default VideoPlayer;
