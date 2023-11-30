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
  const [items, setItems] = useState([
    { id: 1, text: "Track 1" },
    { id: 2, text: "Track 2" },
    { id: 3, text: "Track 3" },
  ]);

  const moveItem = (fromIndex, toIndex) => {
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
    const wsRegions = wavesurferref.current?.registerPlugin(
      RegionsPlugin.create()
    );
    wsRegions.addRegion({
      start: startRegion,
      end: updatedRegion,
      color: "#333333",
      minLength: 3,
    });
    setstartRegion(updatedRegion);
    setUpdatedRegion(updatedRegion + 5);

    wsRegions.on("region-updated", (region: any) => {
      setstartRegion(region.end);
      setUpdatedRegion(region.end + 5);
      console.log("#Updated region", region);
    });

    wsRegions.on("region-clicked", (region: any) => {
      console.log("#Updated region", region);
      setOpenModal(true);
    });
  };

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
        {openModal && <ControlPopup />}
      </div>
      <DndProvider backend={HTML5Backend}>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            text={item.text}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </DndProvider>
    </div>
  );
};

const DraggableItem = ({ id, text, index, moveItem }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
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
