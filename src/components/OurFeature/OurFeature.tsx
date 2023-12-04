import React from "react";
import styles from "./OurFeature.module.scss";
import arrow from "../../../public/icons/right-arrow-black.svg";
import texttoMusic from "../../../public/icons/Text to Music.svg";
import tuneVariations from "../../../public/icons/Tune variations.svg";
import videocomposition from "../../../public/icons/Video composition.svg";
import hum from "../../../public/icons/HumtoMusic.svg";
import leftWing from "../../../public/icons/leftWing.svg";
import rightWing from "../../../public/icons/rightWing.svg";
import promptVideo from "../../../public/video/promptVideo.mp4";
import hummedVideo from "../../../public/video/hummed.mp4";
import usecase1 from "../../../public/video/usecase1.mp4";
import usecase2 from "../../../public/video/usecase2.mp4";

const OurFeature = () => {
  return (
    <div className={styles.featureContainer}>
      <div className={styles.topContainer}>
        <div className={styles.heading}>
          With <span className={styles.dhunText}>Dhun.AI</span> You Create...{" "}
        </div>
        {/* <div className={styles.title}>
          Dhun.ai is a revolutionary music studio that combines the artistry of
          human creativity with the precision of cutting-edge technology. We
          specialise in leveraging the power of Generative AI to craft unique,
          high-quality music compositions.
        </div> */}
      </div>

      <div className={styles.prompt}>
        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={texttoMusic} alt="promptIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>TEXT TO MUSIC</div>
              <div className={styles.propmtTitle}>
                Create music by simply typing text. Ideal for quickly
                translating moods and themes into custom soundtracks.
              </div>
            </div>
          </div>
          <div className={styles.promptVideo}>
            <video autoPlay width="auto" muted loop>
              <source src={usecase1} type="video/mp4" />
            </video>
          </div>
          <div className={styles.break} />
          <div className={styles.tryButton}>
            Try now <img className={styles.arrow} src={arrow} />
          </div>
        </div>

        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={tuneVariations} alt="promptIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>Tune Variations </div>
              <div className={styles.propmtTitle}>
                Hum a tune, we create a spontaneous composition which can be
                used for capturing and expanding on musical ideas.
              </div>
            </div>
          </div>
          <div className={styles.promptVideo}>
            <video autoPlay width="auto" muted loop>
              <source src={usecase2} type="video/mp4" />
            </video>
          </div>
          <div className={styles.break} />
          <div className={styles.tryButton}>
            Try now <img className={styles.arrow} src={arrow} />
          </div>
        </div>
      </div>

      {/* Coming soon part */}
      <div className={styles.prompt}>
        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={hum} alt="variationIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>hum to music </div>
              <div className={styles.propmtTitle}>
                Hum a tune, a spontaneous composition is created which can be
                used for capturing and expanding on musical ideas.
              </div>
            </div>
          </div>
          <div className={styles.break} />
          <div className={styles.comingSoon}>
            <img src={leftWing} alt="wing" />
            <div>Coming soon</div>
            <img src={rightWing} alt="wing" />
          </div>
        </div>

        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={videocomposition} alt="composiotionIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>Video Sync Composition</div>
              <div className={styles.propmtTitle}>
                Creates music to match videos, blending visuals and sound
                seamlessly.
              </div>
            </div>
          </div>
          <div className={styles.break} />
          <div className={styles.comingSoon}>
            <img src={leftWing} alt="wing" />
            <div>Coming soon</div>
            <img src={rightWing} alt="wing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeature;
