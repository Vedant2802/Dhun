import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ConntrolSelection.module.scss";

import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";

interface WaveformProps {
  trackId: string;
}
const ControlSelection: React.FC<WaveformProps> = ({ trackId }) => {
  // const waveformRef = useRef<HTMLDivElement>(null);

  const waveformParams = {
    container: "#waveform",
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
  };
  useEffect(() => {
    const waveform = WaveSurfer.create(waveformParams);
    // const wsRegions = waveform.registerPlugin(RegionsPlugin.create());
    waveform.registerPlugin(TimelinePlugin.create());
    return () => waveform.destroy();
  }, [trackId]);

  const addRegion = () => {
    const waveform = WaveSurfer.create(waveformParams);
    const wsRegions = waveform.registerPlugin(RegionsPlugin.create());
    waveform.on("ready", () => {
      wsRegions.addRegion({
        start: 5,
        end: 10,
        color: "rgba(255, 0, 0, 0.3)",
      });
    });
  };

  return (
    <div>
      <div id="waveform" className={styles.waveformContainer} />
      {/* <div ref={waveformRef} /> */}
      <button onClick={addRegion}>Add Region</button>
    </div>
  );
};

export default ControlSelection;
