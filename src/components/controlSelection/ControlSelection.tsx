import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ConntrolSelection.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { ControlPopup } from "../controlPopup/controlPopup";
// @ts-ignore
import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
// @ts-ignore
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import * as React from "react";
import { createPortal } from "react-dom";

import { useGenerateStore } from "../../stores/generateStore";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
interface WaveformProps {
  trackUrl?: string;
}
const ControlSelection: React.FC<WaveformProps> = ({ trackUrl }) => {
  const [startRegion, setstartRegion] = useState(0);
  const [updatedRegion, setUpdatedRegion] = useState(10);
  const wavesurferref = useRef<any>(null);
  const videoElement = document.querySelector("video");
  const [openModal, setOpenModal] = useState<boolean>();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [regionBar,setRegionBar] = useState([]);
  // const [regionChange,setRegionChange] = useState()
  const updateCurrentTimeFrameDetails = useGenerateStore(
    (state) => state.updateCurrentTimeFrameDetails
  );
  const timeFrames = useGenerateStore((state) => state.timeFrameData);
  const currentTimeFrameId = useGenerateStore(
    (state) => state.currentTimeFrameId
  );
  const apiStatus = useGenerateStore((state) => state.status);
  const addNewTimeFrame = useGenerateStore((state) => state.addNewTimeFrame);

  const musicPlaying = useGenerateStore((state) => state.isMusicPlaying);
 

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
    style: {
      fontSize: "10px",
      color: "#FFF",
    },
  });

  // creating a waveform on given url
  const waveformParams = {
    container: "#waveform",
    waveColor: "#242424",
    progressColor: "#242424",
    height: 70,
    minPxPerSec: 40,
    dragToSeek: true,
    cursorWidth: 3,
    cursorColor: "rgba(127, 241, 131, 1)",
    plugins: [topTimeline],
    backend: "MediaElement",
    media: videoElement,
    hideScrollbar: true,
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: any) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    if (!trackUrl) return;
    wavesurferref.current = WaveSurfer.create(waveformParams as any);
    // const audioUrl = trackUrl.replace(".mp4", ".mp3");
    wavesurferref.current?.load(trackUrl);
    document.addEventListener("keydown", handleEscapeKeyPress);
    // if (wavesurferref.current) {
    //   const volume = isMuted ? 0 : 1;
    //   wavesurferref.current.setVolume(volume);
    // }

    return () => {
      wavesurferref.current?.destroy();
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [trackUrl]);

  useEffect(() => {
    if (musicPlaying) {
      wavesurferref.current?.play();
      wavesurferref.current.setTime(0);
      wavesurferref.current.setVolume(0);
    } else {
      wavesurferref.current?.pause();
    }
  }, [musicPlaying]);

  // useEffect(() => {
  //   setstartRegion(0);
  //   setUpdatedRegion(10);
  //   const timeoutId = setTimeout(() => {
  //     addRegion();
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [trackUrl]);

  const regionChange = (id: any) => {
    const divElement = document.getElementById(id);
    if (divElement) {
      const rect = divElement.getBoundingClientRect();
      console.log('Element coordinates:', rect);
    }
  }

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
      minLength: 5,
    });
    setstartRegion(updatedRegion);
    setUpdatedRegion(updatedRegion + 10);

    wsRegions.on("region-updated", (region: any) => {
      setstartRegion(region.end);
      setUpdatedRegion(region.end + 10);
      console.log(region)
      regionChange(region.id)
    });
    addNewTimeFrame(getLastTimeFrameId + 1);

    wsRegions.on("region-clicked", (region: any) => {
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
    <>
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

          {openModal &&
            createPortal(
              <div className={styles.popupContainer}>
                <ControlPopup onClose={handleTogglePopup} />,
              </div>,
              document.body
            )}
        </div>
      </div>
      <div onClick={addRegion} className={styles.addSongsBox}>
        <img src={addIcon} alt="addSongs" />
      </div>
    </>
  );
};

export default ControlSelection;
