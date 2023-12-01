import React, { useState } from "react";
import styles from "./DhunAiComponent.module.scss";
import dhunAI from "../../../public/video/dhunAI.mp4";
import arrow from "../../../public/icons/right-arrow.svg";
import volumeUp from "../../../public/icons/volumeIcon.svg";
import promptVideo from "../../../public/video/promptVideo.mp4";
import WebModal from "../webGenerateModal/WebModal";
import { createPortal } from "react-dom";

const DhunAiComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openPrompt = () => {
    setOpenModal(true);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.detailDhunai}>
        <div className={styles.heading}>Craft Symphonies with a Click!</div>
        <div className={styles.title}>
          Endless possibilities with Dhun.AI
          <br />
          to turn your thoughts into magical
          <br /> melodies.
        </div>
        <div className={styles.button} onClick={openPrompt}>
          Create magic now <img className={styles.arrow} src={arrow} />
        </div>
      </div>
      {openModal && createPortal(<WebModal />, document.body)}
      <div className={styles.videoContainer}>
        <div className={styles.videoPart}>
          <video autoPlay width="auto" muted loop>
            <source src={promptVideo} type="video/mp4" />
          </video>
        </div>
        <div className={styles.videoSelection}>
          <div className={styles.contentButton}>
            Patriotic music with suspense
          </div>
          <div className={styles.contentButton}>
            Dark villain entering the kingdom
          </div>
          <div className={styles.contentButton}>
            Political moment that ends up in a win
          </div>
          <div className={styles.contentButton}>
            Political moment that ends up in a win
          </div>
        </div>
      </div>
    </div>
  );
};

export default DhunAiComponent;
