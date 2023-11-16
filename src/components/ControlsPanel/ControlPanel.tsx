import styles from "./ControlPanel.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { useEffect, useRef, useState } from "react";

const ControlPanel = () => {
  const [boxes, setBoxes] = useState<string[]>([]);

  const [width, setWidth] = useState(100);
  const [isResizing, setIsResizing] = useState(false);
  const initialX = useRef<number | null>(null);

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
    debugger;
    setIsResizing(true);
    initialX.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const addBox = () => {
    setBoxes([...boxes, "Track"]);
  };

  return (
    <>
      <div className={styles.musicContailer}>
        <div className={styles.trackContainer}>
          {boxes.map((box, index) => (
            <div
              key={index}
              className={styles.resizableBox}
              style={{ width: width }}
              onMouseDown={handleMouseDown}
            >
              <div className={styles.trackName}>
                {box} {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.addSongsBox} onClick={addBox}>
          <img src={addIcon} alt="addSongs" />
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
