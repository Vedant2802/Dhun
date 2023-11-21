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
  const [startRegion, setstartRegion] = useState(0);
  const [updatedRegion, setUpdatedRegion] = useState("5");
  const wavesurferref = useRef(null);

  // Timeline to create on top
  const topTimeline = TimelinePlugin.create({
    insertPosition: "beforebegin",
    height: 20,
    timeInterval: 1,
    primaryLabelInterval: 5,
    secondaryLabelInterval: 5,
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
    top: 10,
    url: trackId,
    plugins: [topTimeline],
  };

  useEffect(() => {
    wavesurferref.current = WaveSurfer.create(waveformParams);
    return () => wavesurferref.current.destroy();
  }, [trackId]);

  const addRegion = () => {
    const wsRegions = wavesurferref.current.registerPlugin(RegionsPlugin.create());
     wsRegions.addRegion({
       start: 0,
       end: 5,
       color: "rgba(255, 0, 0, 0.3)",
     });
   wsRegions.on("region-updated", (region: any) => {
     console.log("#Updated region", region);
     console.log("#Updated region", region.start);
     console.log("#Updated region", region.end);
     console.log("#Updated region", region.totalDuration);
   });
    
  };

  return (
    <div className={styles.musicContailer}>
      <div className={styles.controlContainer}>
        <div ref={wavesurferref} id='waveform' className={styles.waveformContainer} />
        <div onClick={addRegion} className={styles.addSongsBox}>
          <img src={addIcon} alt="addSongs" />
        </div>
      </div>
    </div>
  );
};

export default ControlSelection;
