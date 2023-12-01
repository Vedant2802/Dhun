import React from "react";
import styles from "./OurFeature.module.scss";
import prompt from "../../../public/icons/prompt.svg";
import hummed from "../../../public/icons/hummed.svg";
import variation from "../../../public/icons/variation.svg";
import composiotion from "../../../public/icons/composiotion.svg";
import promptVideo from "../../../public/video/promptVideo.mp4";
import hummedVideo from "../../../public/video/hummed.mp4";

const OurFeature = () => {
  return (
    <div className={styles.featureContainer}>
      <div className={styles.topContainer}>
        <div className={styles.heading}>Our features</div>
        <div className={styles.title}>
          Dhun.ai is a revolutionary music studio that combines the artistry of
          human creativity with the precision of cutting-edge technology. We
          specialise in leveraging the power of Generative AI to craft unique,
          high-quality music compositions.
        </div>
      </div>

      <div className={styles.prompt}>
        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={prompt} alt="promptIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>Text Prompt Generation</div>
              <div className={styles.propmtTitle}>
                Create music by simply typing text. Ideal for quickly
                translating moods and themes into custom soundtracks.
              </div>
            </div>
          </div>
          <div className={styles.promptVideo}>
            <video autoPlay width="auto" muted>
              <source src={promptVideo} type="video/mp4" />
            </video>
          </div>
          <div className={styles.break} />
          <div className={styles.tryButton}>Try now</div>
        </div>

        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={hummed} alt="promptIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>Hummed Prompt Input</div>
              <div className={styles.propmtTitle}>
                Hum a tune, we create a spontaneous composition which can be
                used for capturing and expanding on musical ideas.
              </div>
            </div>
          </div>
          <div className={styles.promptVideo}>
            <video autoPlay width="auto" muted>
              <source src={hummedVideo} type="video/mp4" />
            </video>
          </div>
          <div className={styles.break} />
          <div className={styles.tryButton}>Try now</div>
        </div>
      </div>

      {/* Coming soon part */}
      <div className={styles.prompt}>
        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={variation} alt="variationIcon" />
            </div>
            <div className={styles.promptDetails}>
              <div className={styles.promptHeader}>Tune Variations Engine</div>
              <div className={styles.propmtTitle}>
                Input original track, get unique variations, expand creativity,
                keep essence.
              </div>
            </div>
          </div>
          <div className={styles.break} />
          <div className={styles.comingSoon}>Coming soon</div>
        </div>

        <div className={styles.promptMainContainer}>
          <div className={styles.promptTopContainer}>
            <div>
              <img src={composiotion} alt="composiotionIcon" />
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
          <div className={styles.comingSoon}>Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default OurFeature;
