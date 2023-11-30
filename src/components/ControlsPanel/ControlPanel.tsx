import styles from "./ControlPanel.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { useEffect, useRef, useState } from "react";
import { ControlPopup } from "../controlPopup/controlPopup";
import React from "react";
import { useGenerateStore } from "../../stores/generateStore";

const ControlPanel = () => {
  const [boxes, setBoxes] = useState<string[]>([]);

  const [width, setWidth] = useState(100);
  const [isResizing, setIsResizing] = useState(false);
  const initialX = useRef<number | null>(null);
  const timeFrames = useGenerateStore((state) => state.timeFrameData);
  const addNewTimeFrame = useGenerateStore((state) => state.addNewTimeFrame);

  const EMOTION = [
    "Joy",
    "Amazment",
    "Love",
    "Disgust",
    "Sadness",
    "Anger",
    "Fear",
    "Courage",
    "Calm",
  ];
  const INSTRUMENTS = [
    { value: "none selected", label: "None Selected" },
    { value: "horns", label: "Horns" },
    { value: "bansuri", label: "Bansuri" },
    { value: "accordian", label: "Accordian" },
    { value: "flute", label: "Flute" },
    { value: "bells", label: "Bells" },
    { value: "drums", label: "Drums" },
    { value: "tabla", label: "Tabla" },
    { value: "percussion", label: "Percussion" },
    { value: "piano", label: "Piano" },
    { value: "harp", label: "Harp" },
    { value: "guitar", label: "Guitar" },
    { value: "sitar", label: "Sitar" },
    { value: "violin", label: "Violin" },
    { value: "cello", label: "Cello" },
  ];
  const GENRE = ["Adventure", "Romantic", "Drama", "Suspenseful"];
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    initialX.current = e.clientX;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || initialX.current === null) return;

    const newWidth = width + (e.clientX - initialX.current);

    if (newWidth >= 50) {
      // Limit minimum width, adjust as needed
      setWidth(newWidth);
      initialX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsResizing(true);
    initialX.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const addBox = () => {
    addNewTimeFrame();
  };

  return (
    <>
      <div className={styles.musicContailer}>
        <div className={styles.trackContainer}>
          {timeFrames.map((timeframe, index) => (
            <div
              key={timeframe.id}
              className={styles.resizableBox}
              style={{ width: width }}
              onMouseDown={handleMouseDown}
            >
              <div className={styles.trackName}>
                {"Track"} {index + 1}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.containeraddSongs}>
          <div className={styles.addSongsBox} onClick={addBox}>
            <img src={addIcon} alt="addSongs" />
          </div>
        </div>
        <ControlPopup />
      </div>
    </>
  );
};

export default ControlPanel;
