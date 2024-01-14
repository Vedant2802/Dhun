// import styles from "./ControlPanel.module.scss";
import { useEffect, useRef, useState } from "react";
import React from "react";
// import WaveSurfer from "wavesurfer.js";
// @ts-ignore
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import WaveSurfer from "wavesurfer.js";
import styles from "../controlSelection/ConntrolSelection.module.scss";

interface WaveformProps {
  audioUrl?: string;
}
const ControlPanel: React.FC<WaveformProps> = ({ audioUrl }) => {
  const waveformRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    // Initialize WaveSurfer
    waveformRef.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "violet",
      progressColor: "purple",
      plugins: [
        TimelinePlugin.create({
          container: "#wave-timeline",
          primaryColor: "blue",
          secondaryColor: "lightblue",
          primaryFontColor: "darkblue",
          secondaryFontColor: "darkblue",
          notchPercentHeight: 90,
        }),
      ],
    });

    // Load audio file if available
    if (audioUrl) {
      waveformRef.current.load(audioUrl);
    }

    return () => {
      // Cleanup on component unmount
      waveformRef.current?.destroy();
    };
  }, [audioUrl]);

  return (
    // <div>
    //   <div>
    //     <div id="waveform"></div>
    //     <div id="wave-timeline"></div>
    //   </div>
    // </div>

    <div className={styles.outercontainer}>
      <div className={styles.mainContainer}>
        <div className={styles.musicContainer}>
          <div className={styles.controlContainer}>
            <div id="waveform"></div>
            <div id="wave-timeline"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
