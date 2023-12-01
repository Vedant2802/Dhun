import React from "react";
import styles from "./WebModal.module.scss";

const WebModal = () => {
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
    </div>
  );
};

export default WebModal;
