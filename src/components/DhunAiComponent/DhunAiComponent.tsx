import React from "react";
import styles from "./DhunAiComponent.module.scss";
import dhunAI from "../../../public/video/dhunAI.mp4";
import arrow from "../../../public/icons/right-arrow.svg"; 
import volumeUp from "../../../public/icons/volumeIcon.svg";
import promptVideo from "../../../public/video/promptVideo.mp4";
const DhunAiComponent = () => {
  const openPrompt = () => {
    console.log("gotopopup");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.detailDhunai}>
        <div className={styles.heading}>Craft Symphonies with a Click!</div>
        <div className={styles.title}>
          Endless possibilities with Dhun.AI to turn your thoughts into magical
          melodies.{" "}
        </div>
        <div className={styles.title}>Endless possibilities with Dhun.AI
        <br/>to turn your thoughts into magical<br/> melodies.</div>
        <div onClick={openPrompt} className={styles.button}>Create magic now <img className={styles.arrow} src={arrow} /></div>
          Create magic now
        </div>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.videoPart}>
          <video width="auto" muted autoPlay loop>
            <source src={promptVideo} type="video/mp4" />
          </video>
        </div>
        {/* <div className={styles.controls}>
          <div className={styles.volumeCircle}>
            <img src={volumeUp} alt="volume" />
          </div>
          <div></div>
        </div> */}
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
