import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ConntrolSelection.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { ControlPopup } from "../controlPopup/controlPopup";
import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import * as React from "react";
interface WaveformProps {
  trackUrl: string;
}
const ControlSelection: React.FC<WaveformProps> = ({ trackUrl }) => {
  const [startRegion, setstartRegion] = useState(0);
  const [updatedRegion, setUpdatedRegion] = useState(5);
  const wavesurferref = useRef(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const videoElement = document.querySelector("video");
  const [openModal, setOpenModal] = useState<boolean>();
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
    waveColor: "#2c2c2c",
    progressColor: "#2c2c2c",
    height: 70,
    minPxPerSec: 10,
    dragToSeek: true,
    cursorWidth: 3,
    cursorColor: "rgba(127, 241, 131, 1)",
    plugins: [topTimeline],
    backend: "MediaElement",
    media: videoElement,
  };

  useEffect(() => {
    if (!trackUrl) return;
    wavesurferref.current = WaveSurfer.create(waveformParams);
    wavesurferref.current?.load(trackUrl);
    return () => wavesurferref.current?.destroy();
  }, [trackUrl]);

  const addRegion = () => {
    const wsRegions = wavesurferref.current?.registerPlugin(
      RegionsPlugin.create()
    );
    wsRegions.addRegion({
      start: startRegion,
      end: updatedRegion,
      color: "rgba(255, 0, 0, 0.3)",
    });
    setstartRegion(updatedRegion);
    setUpdatedRegion(updatedRegion + 5);

    wsRegions.on("region-updated", (region: any) => {
      setstartRegion(region.end);
      setUpdatedRegion(region.end + 5);
      console.log("#Updated region", region);
    });
    setShowPopup(true);

    wsRegions.on("region-clicked", (region: any) => {
      console.log("#Updated region", region);
      setOpenModal(true);
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.musicContainer}>
        <div className={styles.controlContainer}>
          <div
            ref={wavesurferref}
            id="waveform"
            className={styles.waveformContainer}
          />
        </div>
      </div>
      <div onClick={addRegion} className={styles.addSongsBox}>
        <img src={addIcon} alt="addSongs" />
      </div>
      {openModal && <ControlPopup />}
    </div>
  );
};

export default ControlSelection;
