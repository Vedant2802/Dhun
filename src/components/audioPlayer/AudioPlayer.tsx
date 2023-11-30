import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import playcircle from "../../../public/icons/play_circle_filled.svg";

const AudioPlayer = () => {
  const [isPlay, setIsplay] = useState<boolean>(false);
  const audioRef = useRef(null);
  const track = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  const handlePlay = () => {
    setIsplay(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      const audioPlayer = videojs(audioRef.current);
      RegisterAndEvents(audioPlayer);
      audioPlayer.src({
        src: " ",
      });
      audioPlayer.play();
    }
  }, [isPlay]);

  const RegisterAndEvents = (audioPlayer: any) => {
    const audio = audioPlayer;
    audio.registerVideoListeners = function () {
      audioPlayer.on("ended", audio.onPlayEndedEvent);
      audioPlayer.on("play", audio.onPlayEvent);
      audioPlayer.on("pause", audio.onPauseEvent);
      audioPlayer.on("loadeddata", audio.onPlayerEvents);
    };

    audio.onPlayEndedEvent = function (e: any) {};
    audio.onPlayEvent = function () {
      console.log("play");
    };
    audio.onPauseEvent = function () {
      console.log("pause");
    };

    audio.onPlayerEvents = function () {
      console.log("isPlayerReady");
    };

    audio.registerVideoListeners();
  };

  return (
    <div>
      <audio
        className="video-js"
        ref={audioRef}
        style={{
          display: "none",
        }}
      />
      <div onClick={handlePlay}>
        <img src={playcircle} />
      </div>
    </div>
  );
};

export default AudioPlayer;
