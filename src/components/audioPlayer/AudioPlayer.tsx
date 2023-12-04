import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import { useGenerateStore } from "../../stores/generateStore";

const AudioPlayer = () => {
  const audioRef = useRef<any>(null);
  const track = useGenerateStore((state) => state.currentMusicSrc);
  const musicPlaying = useGenerateStore((state) => state.isMusicPlaying);

  useEffect(() => {
    if (audioRef.current && track && musicPlaying) {
      const audioPlayer = videojs(audioRef.current);
      RegisterAndEvents(audioPlayer);
      audioPlayer.src({
        src: track,
      });
      audioPlayer.play();
    }
    if (!musicPlaying) {
      const audioPlayer = videojs(audioRef.current);
      audioPlayer?.pause();
    }
  }, [track, musicPlaying]);

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
    </div>
  );
};

export default AudioPlayer;
