import styles from "./ControlPanel.module.scss";
import addIcon from "../../../public/icons/addIcon.svg";
import { useEffect, useRef, useState } from "react";
import { ControlPopup } from "../controlPopup/controlPopup";
import React from "react";

const ControlPanel = () => {
  const [boxes, setBoxes] = useState<string[]>([]);
  
  const [width, setWidth] = useState(100);
  const [isResizing, setIsResizing] = useState(false);
  const initialX = useRef<number | null>(null);
  const [emotion,setEmotion] =useState<string>("None Selected");
  const [emotionOptionopen,setEmotionOptionOpen] = useState<boolean>(false);
  const [instruments,setInstruments] = useState<string>("Choose Instruments");
  const [instrumentOptionsOpen,setIntrumentOptionsOpen] = useState<boolean>(false);
  const [genre,SetGenre] = useState("None Selected");
  const [genreOptionsOpen,setGenreOptionsOpen] = useState<boolean>(false);
  const [tempo,setTempo] = useState("");
  
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
    {value: 'none selected', label: 'None Selected'},
    { value: "horns", label: "Horns" },
    { value: "bansuri", label: "Bansuri" },
    { value: "accordian", label: "Accordian" },
    { value: "flute", label: "Flute"},
    { value: "bells", label: "Bells" },
    { value: "drums", label: "Drums" },
    { value: "tabla", label: "Tabla" },
    { value: "percussion", label: "Percussion"},
    { value: "piano", label: "Piano" },
    { value: "harp", label: "Harp" },
    { value: "guitar", label: "Guitar" },
    { value: "sitar", label: "Sitar" },
    { value: "violin", label: "Violin" },
    { value: "cello", label: "Cello" }
  ]
  const GENRE = [
    "Adventure",
    "Romantic",
    "Drama",
    "Suspenseful"
  ]
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
