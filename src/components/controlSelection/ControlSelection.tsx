import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ConntrolSelection.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { ControlPopup } from "../controlPopup/controlPopup";
import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import * as React from "react";
import { createPortal } from "react-dom";

import { useGenerateStore } from "../../stores/generateStore";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
interface WaveformProps {
  trackUrl: string;
}
const ControlSelection: React.FC<WaveformProps> = ({ trackUrl }) => {
  const [startRegion, setstartRegion] = useState(0);
  const [updatedRegion, setUpdatedRegion] = useState(5);
  const wavesurferref = useRef(null);
  // const videoElement = document.querySelector("video");
  const [openModal, setOpenModal] = useState<boolean>();
  const updateCurrentTimeFrameDetails = useGenerateStore(
    (state) => state.updateCurrentTimeFrameDetails
  );
  const timeFrames = useGenerateStore((state) => state.timeFrameData);
  const currentTimeFrameId = useGenerateStore(
    (state) => state.currentTimeFrameId
  );
  const apiStatus = useGenerateStore((state) => state.status);
  const addNewTimeFrame = useGenerateStore((state) => state.addNewTimeFrame);

  const trackItems = timeFrames.find(
    (timeFrame) => timeFrame.id === currentTimeFrameId
  )?.generatedData;

  // Timeline to create on top
  const topTimeline = TimelinePlugin.create({
    insertPosition: "beforebegin",
    height: 20,
    timeInterval: 1,
    primaryLabelInterval: 5,
    secondaryLabelInterval: 5,
    duration: 180,
    style: {
      fontSize: "10px",
      color: "#FFF",
    },
  });

  // creating a waveform on given url
  const waveformParams = {
    container: "#waveform",
    waveColor: "#242424",
    progressColor: "#2c2c2c",
    height: 70,
    minPxPerSec: 10,
    dragToSeek: true,
    cursorWidth: 3,
    cursorColor: "rgba(127, 241, 131, 1)",
    plugins: [topTimeline],
    // backend: "MediaElement",
    // media: videoElement,
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    if (!trackUrl) return;
    wavesurferref.current = WaveSurfer.create(waveformParams);
    // setTimeout(() => {
    // }, 500);
    const audioUrl = trackUrl.replace(".mp4", ".mp3");
    wavesurferref.current?.load(audioUrl);
    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => {
      wavesurferref.current?.destroy();
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [trackUrl]);

  const addRegion = () => {
    const getLastTimeFrameId = timeFrames.length
      ? timeFrames[timeFrames.length - 1]?.id
      : 0;
    const wsRegions = wavesurferref.current?.registerPlugin(
      RegionsPlugin.create()
    );
    wsRegions.addRegion({
      start: startRegion,
      end: updatedRegion,
      id: "region_" + (getLastTimeFrameId + 1),
      color: "#333333",
      minLength: 3,
    });
    setstartRegion(updatedRegion);
    setUpdatedRegion(updatedRegion + 5);

    wsRegions.on("region-updated", (region: any) => {
      setstartRegion(region.end);
      setUpdatedRegion(region.end + 5);
    });
    addNewTimeFrame(getLastTimeFrameId + 1);

    wsRegions.on("region-clicked", (region: any) => {
      console.log("#Updated region", region);
      const duration = region.end - region.start;
      const id = parseInt(region.id.split("_")[1]);
      updateCurrentTimeFrameDetails(id, duration);
      setOpenModal(true);
    });
  };

  // Handle mouse click events
  const handleTogglePopup = () => {
    setOpenModal(!openModal);
  };

  //Handle lifecycle hooks
  React.useEffect(() => {
    if (apiStatus === API_STATUS_TYPES.success) {
      setOpenModal(false);
    }
  }, [apiStatus]);

  return (
    <div className={styles.outercontainer}>
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
        crea
        {openModal &&
          createPortal(
            <div className={styles.popupContainer}>
              <ControlPopup onClose={handleTogglePopup} />,
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default ControlSelection;
