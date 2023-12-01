import React, { useState } from "react";
import styles from "./WebModal.module.scss";
import playIcon from "../../../public/icons/play.svg";

const WebModal = () => {
  const [promptValue, setPromptValue] = useState<string>("");
  return (
    <div className={styles.generatePopup}>
      <div className={styles.topCard}></div>
      <div className={styles.chipButton}>
        <div>
          <input />
        </div>
        <div className={styles.chip}>Upbeat, spiritual music </div>
        <div className={styles.chip}>Indian, soulful, timeless, melody </div>
        <div className={styles.createButton}>Create</div>
      </div>

      <div className={styles.loadingChip}>
        <div className={styles.chip1}>
          <img src={playIcon} alt="playIcon" />
          <div>Track 1</div>
        </div>
        <div className={styles.chip2}>
          <img src={playIcon} alt="playIcon" />
          <div>Track 2</div>
        </div>
        <div className={styles.chip3}>
          <img src={playIcon} alt="playIcon" />
          <div>Track 3</div>
        </div>
        <div className={styles.createButton}>Recreate</div>
      </div>
    </div>
  );
};

export default WebModal;
