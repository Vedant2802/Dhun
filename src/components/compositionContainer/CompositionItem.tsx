import React from "react";
import styles from "./compositionContainer.module.scss";
import kebab from "../../../public/icons/KebabMenu-Vertical.svg";
import playcircle from "../../../public/icons/play_circle_filled.svg";
import { useGenerateStore } from "../../stores/generateStore";
interface CompositionItemProps {
  musicSrc: string;
  musicName: string;
  isDefault: boolean;
}

const CompositionItem: React.FC<CompositionItemProps> = ({
  musicSrc,
  musicName,
  isDefault,
}) => {
  const setCurrentMusicSrc = useGenerateStore(
    (state) => state.setCurrentMusicSrc
  );
  const handlePlay = () => {
    if (!isDefault) {
      setCurrentMusicSrc(musicSrc);
    }
  };
  return (
    <div className={styles.composition}>
      <div className={styles.playButtonContainer}>
        <div onClick={handlePlay}>
          <img src={playcircle} />
        </div>
        <span className={styles.compositionText}>{musicName}</span>
      </div>
      <img src={kebab} />
    </div>
  );
};

export default CompositionItem;
