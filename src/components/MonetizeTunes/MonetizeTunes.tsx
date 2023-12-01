import React from "react";
import styles from "./MonetizeTunes.module.scss";
import spectrum from "../../../public/icons/spectrum.svg";
import monitizeLogo from "../../../public/icons/monitizeLogo.svg";

const MonetizeTunes = () => {
  return (
    <div>
      <div className={styles.spectrumContainer}>
        <img src={spectrum} alt="" className={styles.spectrumImage} />
      </div>

      <div className={styles.monetizeMainContainer}>
        <div className={styles.monetizeContainer}>
          <div className={styles.header}>
            Ready to create, own & monetize your tunes?
          </div>
          <div className={styles.title}>
            Join Dhun.ai and unlock the magic of creating music.{" "}
          </div>
          <div className={styles.button}>Try Dhun.AI now</div>
        </div>
        <div>
          <img src={monitizeLogo} alt="monitizeLogo" />
        </div>
      </div>
    </div>
  );
};

export default MonetizeTunes;
