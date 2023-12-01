import React from "react";
import styles from "./DhunAiComponent.module.scss";
import dhunAI from "../../../public/video/dhunAI.mp4";

const DhunAiComponent = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.detailDhunai}>
        <div className={styles.heading}>
          Creating music was never this easy!
        </div>
        <div className={styles.title}>Endless possibilities with Dhun.AI</div>
        <div className={styles.button}>Try Dhun.AI now</div>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.videoPart}>
          <video autoPlay width="auto" muted loop>
            <source src={dhunAI} type="video/mp4" />
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
