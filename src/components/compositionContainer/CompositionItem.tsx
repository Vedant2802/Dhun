import React from "react";
import styles from "./compositionContainer.module.scss";
import kebab from "../../../public/icons/KebabMenu-Vertical.svg";
import pause from "../../../public/icons/pause.svg";
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
  const currentMusicSrc = useGenerateStore((state) => state.currentMusicSrc);
  const isMusicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const updateMusicPlayingStatus = useGenerateStore(
    (state) => state.updateMusicPlayingStatus
  );
  const handlePlay = () => {
    if (!isDefault && currentMusicSrc === musicSrc) {
      return updateMusicPlayingStatus(!isMusicPlaying);
    }
    if (!isDefault) {
      setCurrentMusicSrc(musicSrc);
    }
  };

  const getMusicIcon = () => {
    if (isMusicPlaying && currentMusicSrc === musicSrc) {
      return <img className={styles.playButton} src={pause} />;
    }
    return <img className={styles.playButton} src={playcircle} />;
  };
  return (
    <div className={styles.composition}>
      <div className={styles.playButtonContainer}>
        <div onClick={handlePlay}>{getMusicIcon()}</div>
        <span className={styles.compositionText}>{musicName}</span>
      </div>
      <img src={kebab} />
    </div>
  );
};

export default CompositionItem;
