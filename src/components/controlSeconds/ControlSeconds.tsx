import React, { useEffect } from "react";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import WaveSurfer from "wavesurfer.js";
import styles from "./ControlSeconds.module.scss";

interface WaveformProps {
  trackId: string;
}

const ControlSeconds: React.FC<WaveformProps> = ({ trackId }) => {
  const track = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  useEffect(() => {
    if (!track) {
      console.error("Track element not found.");
      return;
    }

    const wsRegions = waveform.registerPlugin(RegionsPlugin.create());

    //  Create an instance of WaveSurfer
    const ws = WaveSurfer.create({
      container: "#waveform",
      waveColor: "rgb(255, 255, 255)",
      progressColor: "rgb(255, 255, 255)",
      url: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
      minPxPerSec: 50,
      // audioRate: 1,
      // barWidth: 3,
      height: 150,
    });

    const wsRegions = ws.registerPlugin(RegionsPlugin.create());
    // Initialize the Timeline plugin
    ws.registerPlugin(TimelinePlugin.create());

    // Play on click
    ws.on("interaction", () => {
      ws.play();
    });

    // To start from begining
    ws.on("finish", () => {
      ws.setTime(0);
    });
    return () => ws.destroy();
  }, [trackId]);

  return (
    <div>
      <div id="waveform" className={styles.waveformContainer} />
    </div>
  );
};

export default ControlSeconds;
