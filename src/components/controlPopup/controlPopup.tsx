import { useState } from "react";
import styles from "./controlPopup.module.scss";

import * as React from "react";
import { useGenerateStore } from "../../stores/generateStore";

export const ControlPopup: React.FC = () => {
  const [emotion, setEmotion] = useState<string>("None Selected");
  const [emotionOptionopen, setEmotionOptionOpen] = useState<boolean>(false);
  const [instruments, setInstruments] = useState<string>("Choose Instruments");
  const [instrumentOptionsOpen, setIntrumentOptionsOpen] =
    useState<boolean>(false);
  const [genre, SetGenre] = useState("None Selected");
  const [genreOptionsOpen, setGenreOptionsOpen] = useState<boolean>(false);
  const [tempo, setTempo] = useState("");
  const generateMusic = useGenerateStore((state) => state.generateMusic);

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

  const handleOnGenerate = () => {
    generateMusic &&
      generateMusic({
        emotion,
        genre,
        instrument: instruments,
        tempo,
      });
  };

  return (
    <>
      <div className={styles.popupBox}>
        <div className={styles.popuppart}>
          <p>Reference Melody</p>
          <div className={styles.uploadfile}>
            <p>Upload reference file</p>
          </div>
        </div>
        <div className={styles.popuppart}>
          <p>Emotion of the scene</p>
          <div>
            <div
              onClick={() => setEmotionOptionOpen(!emotionOptionopen)}
              className={styles.popupdropdown}
            >
              <p>{emotion}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M10.024 12.5865L4.31205 6.02655C4.08836 5.76965 3.72569 5.76965 3.502 6.02655C3.27831 6.28345 3.27831 6.69996 3.502 6.95686L9.56548 13.9205C9.59402 13.9533 9.62481 13.9818 9.65729 14.0063C9.88232 14.2297 10.2228 14.2188 10.4365 13.9733L16.5 7.00972C16.7237 6.75282 16.7237 6.33631 16.5 6.07941C16.2763 5.82251 15.9137 5.82251 15.69 6.07941L10.024 12.5865Z"
                  fill="#ADADAD"
                />
              </svg>
            </div>
            {emotionOptionopen && (
              <ul className={styles.popupdropdownoptions}>
                {EMOTION.map((item, index) => (
                  <li
                    className={styles.popupdropdownoptionsingle}
                    onClick={() => {
                      setEmotionOptionOpen(false);
                      setEmotion(item);
                    }}
                    id={String(index)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.popuppart}>
          <p>Instruments</p>
          <div>
            <div
              onClick={() => setIntrumentOptionsOpen(!instrumentOptionsOpen)}
              className={styles.popupdropdown}
            >
              <p>{instruments}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M10.024 12.5865L4.31205 6.02655C4.08836 5.76965 3.72569 5.76965 3.502 6.02655C3.27831 6.28345 3.27831 6.69996 3.502 6.95686L9.56548 13.9205C9.59402 13.9533 9.62481 13.9818 9.65729 14.0063C9.88232 14.2297 10.2228 14.2188 10.4365 13.9733L16.5 7.00972C16.7237 6.75282 16.7237 6.33631 16.5 6.07941C16.2763 5.82251 15.9137 5.82251 15.69 6.07941L10.024 12.5865Z"
                  fill="#ADADAD"
                />
              </svg>
            </div>
            {instrumentOptionsOpen && (
              <ul className={styles.popupdropdownoptions}>
                {INSTRUMENTS.map((item, index) => (
                  <li
                    className={styles.popupdropdownoptionsingle}
                    onClick={() => {
                      setIntrumentOptionsOpen(false);
                      setInstruments(item.label);
                    }}
                    id={String(index)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.popuppart}>
          <p>Regional setting & genre</p>
          <div onClick={() => setGenreOptionsOpen(!genreOptionsOpen)}>
            <div className={styles.popupdropdown}>
              <p>{genre}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M10.024 12.5865L4.31205 6.02655C4.08836 5.76965 3.72569 5.76965 3.502 6.02655C3.27831 6.28345 3.27831 6.69996 3.502 6.95686L9.56548 13.9205C9.59402 13.9533 9.62481 13.9818 9.65729 14.0063C9.88232 14.2297 10.2228 14.2188 10.4365 13.9733L16.5 7.00972C16.7237 6.75282 16.7237 6.33631 16.5 6.07941C16.2763 5.82251 15.9137 5.82251 15.69 6.07941L10.024 12.5865Z"
                  fill="#ADADAD"
                />
              </svg>
            </div>
            {genreOptionsOpen && (
              <ul className={styles.popupdropdownoptions}>
                {GENRE.map((item, index) => (
                  <li
                    className={styles.popupdropdownoptionsingle}
                    onClick={() => {
                      setGenreOptionsOpen(false);
                      SetGenre(item);
                    }}
                    id={String(index)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.popuppart}>
          <p>Tempo</p>
          <div className={styles.tempoOptions}>
            <div
              onClick={() => setTempo("High")}
              className={`${styles.tempOption} ${
                tempo === "High" && `${styles.tempSelected}`
              }`}
            >
              High
            </div>
            <div
              onClick={() => setTempo("Medium")}
              className={`${styles.tempOption} ${
                tempo === "Medium" && `${styles.tempSelected}`
              }`}
            >
              Medium
            </div>
            <div
              onClick={() => setTempo("Low")}
              className={`${styles.tempOption} ${
                tempo === "Low" && `${styles.tempSelected}`
              }`}
            >
              Low
            </div>
          </div>
        </div>
        <div className={styles.generateButton} onClick={handleOnGenerate}>
          Generate
        </div>
      </div>
    </>
  );
};
