import React from "react";
import styles from "./compositionContainer.module.scss";
import kebab from "../../../public/icons/KebabMenu-Vertical.svg";
import pause from "../../../public/icons/pause.svg";
import playcircle from "../../../public/icons/play_circle_filled.svg";
import { useGenerateStore } from "../../stores/generateStore";
interface CompositionItemProps {
  isDefault: boolean;
  compositionIndex: number;
  compositionName: string;
}

const CompositionItem: React.FC<CompositionItemProps> = ({
  compositionName,
  compositionIndex,
  isDefault,
}) => {
  const setCurrentMusicSrc = useGenerateStore(
    (state) => state.setCurrentMusicSrc
  );
  const currentCompositionIndex = useGenerateStore(
    (state) => state.compositionIndex
  );
  // const currentTimeFrameId = useGenerateStore(
  //   (state) => state.currentTimeFrameId
  // );
  const timeFrameData = useGenerateStore((state) => state.timeFrameData);
  const isMusicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const updateMusicPlayingStatus = useGenerateStore(
    (state) => state.updateMusicPlayingStatus
  );
  const handlePlay = () => {
    if (
      !isDefault &&
      compositionIndex === currentCompositionIndex &&
      isMusicPlaying
    ) {
      return updateMusicPlayingStatus(!isMusicPlaying);
    }
    if (!isDefault) {
      // const currentTimeFrameData = timeFrameData.find(
      //   (item) => item.id === currentTimeFrameId
      // );
      const musicSrc = timeFrameData[0]?.generatedData?.urls[0] as string;
      setCurrentMusicSrc(musicSrc, compositionIndex, compositionIndex);
    }
  };

  const getMusicIcon = () => {
    if (isMusicPlaying && currentCompositionIndex === compositionIndex) {
      return <img className={styles.playButton} src={pause} />;
    }
    return <img className={styles.playButton} src={playcircle} />;
  };
  return (
    <div className={styles.composition}>
      <div className={styles.playButtonContainer}>
        <div onClick={handlePlay}>{getMusicIcon()}</div>
        <span className={styles.compositionText}>{compositionName}</span>
      </div>
      <img src={kebab} />
    </div>
  );
};

export default CompositionItem;
