import React from "react";
import styles from "./OurFeature.module.scss";
import arrow from "../../../public/icons/featureArrow.svg";
import featureIcon1 from "../../../public/icons/featureIcon1.svg";
import featureIcon2 from "../../../public/icons/featureIcon2.svg";
import featureIcon3 from "../../../public/icons/featureIcon3.svg";
import feature1 from "../../../public/icons/feature1.svg";
import feature2 from "../../../public/icons/feature2.svg";
import feature3 from "../../../public/icons/feature3.svg";
import feature4 from "../../../public/icons/feature4.svg";

const OurFeature = () => {
  return (
    <>
      <div className={styles.featureContainerHead}>
        <div className={styles.featureContainerAbout}>
          <div className={styles.featureContainerdiv}>
            <img
              className={styles.featureContainerImg}
              src={featureIcon1}
              alt="feature1"
            />
          </div>
          <span className={styles.featureContainerText}>First in India</span>
          <span className={styles.featureContainerAboutText}>
            India’s first large language model to be trained on Indian
            instruments
          </span>
        </div>
        <div className={styles.featureContainerAbout}>
          <div className={styles.featureContainerdiv}>
            <img
              className={styles.featureContainerImg}
              src={featureIcon2}
              alt="feature1"
            />
          </div>
          <span className={styles.featureContainerText}>High-powered</span>
          <span className={styles.featureContainerAboutText}>
            Easy-to-use, intuitive model trained on 432000 music samples
          </span>
        </div>
        <div className={styles.featureContainerAbout}>
          <div className={styles.featureContainerdiv}>
            <img
              className={styles.featureContainerImg}
              src={featureIcon3}
              alt="feature3"
            />
          </div>
          <span className={styles.featureContainerText}>
            Professional grade
          </span>
          <span className={styles.featureContainerAboutText}>
            Stereo-quality, emotionally-mapped music to match a multitude of
            scenarios  
          </span>
        </div>
      </div>

      <div className={styles.featureContainer}>
        <div className={styles.exploreText}>
          Explore Dhun.ai’s possibilities
        </div>
        <div className={styles.prompt}>
          <div className={styles.row}>
            <div className={styles.promptMainContainer}>
              <div className={styles.promptTopContainer}>
                <img src={feature1} alt="promptIcon1" />
              </div>
              <div className={styles.promptBottom}>
                <span className={styles.span}>Text</span>
                <img className={styles.arrow} src={arrow} alt="arrow" />
                <span className={styles.span}>Music</span>
              </div>
              <div className={styles.promptAbout}>
                <span className={styles.spanAbout}>
                  Type text describing a mood, theme or scenario and generate
                  music instantly 
                </span>
              </div>
              <button
                onClick={() => alert("sample now")}
                className={styles.exportbtn}
              >
                <span className={styles.exportbtnText}>Sample Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.promptMainContainer}>
              <div className={styles.promptTopContainer}>
                <img src={feature2} alt="promptIcon2" />
              </div>
              <div className={styles.promptBottom}>
                <span className={styles.span}>Music</span>
                <img className={styles.arrow} src={arrow} alt="arrow" />
                <span className={styles.span}>Melody variations</span>
              </div>
              <div className={styles.promptAbout}>
                <span className={styles.spanAbout}>
                  Provide a music clip and generate variations of the same music
                  instantly
                </span>
              </div>
              <button
                onClick={() => alert("sample now")}
                className={styles.exportbtn}
              >
                <span className={styles.exportbtnText}>Sample Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.promptMainContainer}>
              <div className={styles.promptTopContainer}>
                <img src={feature3} alt="promptIcon3" />
              </div>
              <div className={styles.promptBottom}>
                <span className={styles.span}>Text</span>
                <img className={styles.arrow} src={arrow} alt="arrow" />
                <span className={styles.span}>
                  Sound effects (Sfx and Foley)
                </span>
              </div>
              <div className={styles.promptAbout}>
                <span className={styles.spanAbout}>
                  Type text describing a sound effect and generate it instantly 
                </span>
              </div>
              <button
                onClick={() => alert("sample now")}
                className={styles.exportbtn}
              >
                <span className={styles.exportbtnText}>Sample Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.promptMainContainer}>
              <div className={styles.promptTopContainer}>
                <img src={feature4} alt="promptIcon4" />
              </div>
              <div className={styles.promptBottom}>
                <span className={styles.span}>Hum</span>
                <img className={styles.arrow} src={arrow} alt="arrow" />
                <span className={styles.span}>Music</span>
              </div>
              <div className={styles.promptAbout}>
                <span className={styles.spanAbout}>
                  Hum a tune and generate music to use instantly or expand on
                  eventually 
                </span>
              </div>
              <button
                onClick={() => alert("sample now")}
                className={styles.exportbtn}
              >
                <span className={styles.exportbtnText}>Sample Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurFeature;
