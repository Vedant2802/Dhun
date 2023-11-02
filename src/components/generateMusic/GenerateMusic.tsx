import styles from "./GenerateMusic.module.scss";
import musicGenerator from "../../../public/icons/musicGenerator.svg";

const GenerateMusic = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.generator}>
          <img src={musicGenerator} alt="generateIcon" />
          <div>Music generator</div>
        </div>

        <div className={styles.reference}>
          <div>Reference theme</div>
          <div>+</div>
        </div>

        <div className={styles.reference}>
          <div>Reference theme</div>
          <div>+</div>
        </div>
      </div>
    </>
  );
};

export default GenerateMusic;
