import React from "react";
import styles from "./GenerateMusic.module.scss";
import musicGenerator from "../../../public/icons/musicGenerator.svg";

const GenerateMusic = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.generateContainer}>
        <div className={styles.generateHeading}>
          <img src={musicGenerator} alt="generateIcon" />
          <div>Music generator</div>
        </div>

        <div className="bg-[#2c2c2c] flex justify-between text-[#dedede] text-[16px] leading-[18px] py-[24px] px-[16px] rounded">
          <div>Reference theme</div>
          <div>+</div>
        </div>

        <div className={styles.reference}>
          <div>Emotion of the scene</div>
          <div>+</div>
        </div>

        <div className={styles.reference}>
          <div>Instruments</div>
          <div>+</div>
        </div>

        <div className={styles.reference}>
          <div>Region</div>
          <div>+</div>
        </div>

        <div className={styles.generate}>
          <div>Generate</div>
        </div>
      </div>
    </div>
  );
};

export default GenerateMusic;
