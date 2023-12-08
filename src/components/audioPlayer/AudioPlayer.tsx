import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import { useGenerateStore } from "../../stores/generateStore";

const AudioPlayer = () => {
  const audioRef = useRef<any>(null);
  const track = useGenerateStore((state) => state.currentMusicSrc);
  const musicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const playNextTrack = useGenerateStore((state) => state.playNextTrack);
  const [audioPlayer, setAudioPlayer] = useState<any>(null);
  const [isMusicEnded, setMusicEnded] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      const audioPlayer = videojs(audioRef.current);
      RegisterAndEvents(audioPlayer);
      setAudioPlayer(audioPlayer);
    }
    return () => {
      audioPlayer && audioPlayer.dispose();
    };
  }, []);

  useEffect(() => {
    if (isMusicEnded) {
      playNextTrack();
    }
  }, [isMusicEnded]);

  useEffect(() => {
    if (audioPlayer && track && musicPlaying) {
      audioPlayer.src({
        src: track,
      });
      audioPlayer.play();
      setMusicEnded(false);
    }
    if (!musicPlaying && audioPlayer) {
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

    audio.onPlayEndedEvent = function (e: any) {
      setMusicEnded(true);
    };
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
