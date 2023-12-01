import * as React from "react";
import { useState, useRef, useEffect } from "react";
// import { useState } from "react";
import styles from "./controlPopup.module.scss";
import { EMOTION, INSTRUMENTS, GENRE } from "../../utils/genAiConstant";
import { useGenerateStore } from "../../stores/generateStore";

type controlPopupProps = {
  onClose: Function;
};

export const ControlPopup: React.FC<controlPopupProps> = ({ onClose }) => {
  const [emotion, setEmotion] = useState<string>("None Selected");
  const [emotionOptionopen, setEmotionOptionOpen] = useState<boolean>(false);
  const [instruments, setInstruments] = useState<string>("Choose Instruments");
  const [instrumentOptionsOpen, setIntrumentOptionsOpen] =
    useState<boolean>(false);
  const [genre, SetGenre] = useState("None Selected");
  const [genreOptionsOpen, setGenreOptionsOpen] = useState<boolean>(false);
  const [tempo, setTempo] = useState("");
  const generateMusic = useGenerateStore((state: any) => state.generateMusic);
  const popupRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleOnGenerate = () => {
    generateMusic &&
      generateMusic({
        email: "test@gmail.com",
        prompt: emotion,
        image_url: "",
        // genre,
        // instrument: instruments,
        tempo,
      });
  };

  return (
    <>
      <div ref={popupRef} className={styles.popupBox}>
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
