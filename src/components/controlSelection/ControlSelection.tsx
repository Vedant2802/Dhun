import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ConntrolSelection.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";

import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
interface WaveformProps {
  trackId: string;
}
const ControlSelection: React.FC<WaveformProps> = ({ trackId }) => {
  const [updatedRegion, setUpdatedRegion] = useState("5");
  // Timeline to create on top
  const topTimeline = TimelinePlugin.create({
    insertPosition: "beforebegin",
    height: 20,
    timeInterval: 1,
    primaryLabelInterval: 5,
    secondaryLabelInterval: 0,
    style: {
      fontSize: "10px",
      color: "#FFF",
    },
  });

  // creating a waveform on given url
  const waveformParams = {
    container: "#waveform",
    // waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    height: 70,
    url: trackId,
    plugins: [topTimeline],
  };

  useEffect(() => {
    const waveform = WaveSurfer.create(waveformParams);
    return () => waveform.destroy();
  }, [trackId]);

  const addRegion = () => {
    const waveform = WaveSurfer.create(waveformParams);
    const wsRegions = waveform.registerPlugin(RegionsPlugin.create());
    waveform.on("ready", () => {
      wsRegions.addRegion({
        start: 0,
        end: 5,
        color: "rgba(255, 0, 0, 0.3)",
      });
    });
    wsRegions.on("region-updated", (region: any) => {
      console.log("#Updated region", region);
      console.log("#Updated region", region.start);
      console.log("#Updated region", region.end);
      console.log("#Updated region", region.totalDuration);
    });
  };

  return (
    <div className={styles.controlContainer}>
      <div id="waveform" className={styles.waveformContainer} />
      <div onClick={addRegion} className={styles.addSongsBox}>
        <img src={addIcon} alt="addSongs" />
      </div>
    </div>
  );
};

export default ControlSelection;
