import React from "react";
import styles from "./OurFeature.module.scss";
import arrow from "../../../public/icons/featureArrow.svg";
import feature1 from "../../../public/icons/feature1.svg";
import feature2 from "../../../public/icons/feature2.svg";
import feature3 from "../../../public/icons/feature3.svg";
import feature4 from "../../../public/icons/feature4.svg";

const OurFeature = () => {
  return (
    <div className={styles.featureContainer}>
      <div className={styles.topContainer}>
        <div className={styles.heading}>
          Make professional-quality music at speed with AI 
        </div>
      </div>

      <div className={styles.prompt}>
        <div className={styles.row}>
          <div className={styles.promptMainContainer}>
            <div className={styles.promptTopContainer}>
              <img src={feature1} alt="promptIcon1" />
            </div>
            <div className={styles.promptBottom}>
              <span className={styles.span}>Create text</span>
              <img className={styles.arrow} src={arrow} alt="arrow" />
              <span className={styles.span}>music</span>
            </div>
            <div className={styles.promptAbout}>
              <span className={styles.spanAbout}>
                Create music by simply typing text. Ideal for quickly
                translating moods and themes into custom soundtracks.
              </span>
            </div>
          </div>

          <div className={styles.promptMainContainer}>
            <div className={styles.promptTopContainer}>
              <img src={feature2} alt="promptIcon2" />
            </div>
            <div className={styles.promptBottom}>
              <span className={styles.span}>Create melody</span>
              <img className={styles.arrow} src={arrow} alt="arrow" />
              <span className={styles.span}>music</span>
            </div>
            <div className={styles.promptAbout}>
              <span className={styles.spanAbout}>
                Input original track, get unique variations, expand creativity,
                keep essence.
              </span>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.promptMainContainer}>
            <div className={styles.promptTopContainer}>
              <img src={feature3} alt="promptIcon3" />
            </div>
            <div className={styles.promptBottom}>
              <span className={styles.span}>Create melody</span>
              <img className={styles.arrow} src={arrow} alt="arrow" />
              <span className={styles.span}>sfx (sound effects)</span>
            </div>
            <div className={styles.promptAbout}>
              <span className={styles.spanAbout}>
                Create sound effects by simply typing text.
              </span>
            </div>
          </div>

          <div className={styles.promptMainContainer}>
            <div className={styles.promptTopContainer}>
              <img src={feature4} alt="promptIcon4" />
            </div>
            <div className={styles.promptBottom}>
              <span className={styles.span}>Turn humming</span>
              <img className={styles.arrow} src={arrow} alt="arrow" />
              <span className={styles.span}>music</span>
            </div>
            <div className={styles.promptAbout}>
              <span className={styles.spanAbout}>
                Hum a tune, we create a spontaneous composition which can be
                used for capturing and expanding on musical ideas.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeature;
