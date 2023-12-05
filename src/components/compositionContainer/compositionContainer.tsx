import * as React from "react";
import styles from "./compositionContainer.module.scss";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { useGenerateStore } from "../../stores/generateStore";
import CompositionItem from "./CompositionItem";

const CompositionContainer: React.FC = () => {
  const currentTimeFrameId = useGenerateStore(
    (state) => state.currentTimeFrameId
  );
  const defaultMusicCompositions = ["1", "2", "3"];
  const timeFrameData = useGenerateStore((state) => state.timeFrameData);

  const renderDefaultCompositions = () => {
    return defaultMusicCompositions.map((_, index) => (
      <CompositionItem
        key={index}
        isDefault={true}
        compositionIndex={index}
        compositionName={"Composition " + (index + 1)}
      />
    ));
  };

  const renderMusicCompositions = () => {
    if (!timeFrameData.length || !currentTimeFrameId) {
      return renderDefaultCompositions();
    }

    const generatedData = timeFrameData.find(
      (timeFrame) => timeFrame.id === currentTimeFrameId
    )?.generatedData;

    if (!generatedData) {
      return renderDefaultCompositions();
    }
    return generatedData?.urls.map((_, index) => (
      <CompositionItem
        key={index}
        isDefault={false}
        compositionIndex={index}
        compositionName={"Composition " + (index + 1)}
      />
    ));
  };

  return (
    <>
      <div className={styles.compositionContainer}>
        {renderMusicCompositions()}
      </div>
    </>
  );
};

export default CompositionContainer;
