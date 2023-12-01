import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styles from "./ConntrolSelection.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { ControlPopup } from "../controlPopup/controlPopup";
import RegionsPlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/regions.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import menuIcon from "../../../public/icons/menu.svg";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as React from "react";
import { useGenerateStore } from "../../stores/generateStore";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
interface WaveformProps {
  trackUrl: string;
}
const ItemType = "ITEM";
const ControlSelection: React.FC<WaveformProps> = ({ trackUrl }) => {
  const [startRegion, setstartRegion] = useState(0);
  const [updatedRegion, setUpdatedRegion] = useState(5);
  const wavesurferref = useRef(null);
  const videoElement = document.querySelector("video");
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

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

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
    backend: "MediaElement",
    media: videoElement,
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    if (!trackUrl) return;
    wavesurferref.current = WaveSurfer.create(waveformParams);
    wavesurferref.current?.load(trackUrl);
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
        {openModal && <ControlPopup onClose={handleTogglePopup} />}
      </div>
      <DndProvider backend={HTML5Backend}>
        {trackItems?.urls.map((item, index) => (
          <DraggableItem
            key={item}
            id={currentTimeFrameId as number}
            text={"Track" + (index + 1)}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </DndProvider>
    </div>
  );
};

type DraggableProps = {
  id: Number;
  text: String;
  index: Number;
  moveItem: Function;
};

const DraggableItem = ({ id, text, index, moveItem }: DraggableProps) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} className={styles.trackComposition}>
      <img src={menuIcon} />
      {text}
    </div>
  );
};

export default ControlSelection;
