// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";
import ControlSelection from "../controlSelection/ControlSelection";
import React from "react";
import { useGenerateStore } from "../../stores/generateStore";
import CompositionContainer from "../compositionContainer/compositionContainer";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import LoadingSpin from "react-loading-spin";
import compositionBackground from "../../../public/timeframeBackground.svg";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../DraggableItem/DraggableItem";
import ControlPanel from "../ControlsPanel/ControlPanel";
const ResultDashboard = () => {
  const { uploadFile, file, status } = useGenerateStore((state) => state);
  const timeFrames = useGenerateStore((state) => state.timeFrameData);
  // const currentTimeFrameId = useGenerateStore(
  //   (state) => state.currentTimeFrameId
  // );

  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    const fileName = event.target.files[0].name;
    FormD.append("file", event.target.files[0]);
    uploadFile(FormD, fileName);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    // const updatedItems = [...trackItems];
    // const [movedItem] = updatedItems.splice(fromIndex, 1);
    // updatedItems.splice(toIndex, 0, movedItem);
    // setItems(updatedItems);
  };
  console.log("file", file);
  const track =
    "http://10.39.255.16:3000/storage/sample_960x400_ocean_with_audio (1).mp3";
  // const urls =
  //   "http://10.39.255.16:3000/storage/sample_960x400_ocean_with_audio%20(1).mp3";
  const url = file?.gcs_url ? file?.gcs_url : track;

  const renderDraggableItem = (urls: string[], timeFrameId: number) => {
    if (!urls) {
      return null;
    }
    return urls.map((url, index) => {
      return (
        <DraggableItem
          key={url}
          id={index}
          timeFrameId={timeFrameId}
          text={"Track" + (index + 1)}
          index={index}
          moveItem={moveItem}
        />
      );
    });
  };

  return (
    <section>
      <div className={styles.timeframeContainer}>
        <div className={styles.uploadContainer}>
          {!file && (
            <div className={styles.addVideoButton}>
              <input
                type="file"
                id="myFile"
                name="filename"
                accept="video/mp4,video/x-m4v,video/*"
                className={styles.videoUpload}
                onChange={onFileUpload}
              ></input>
              <div>+ Add video </div>
            </div>
          )}
          {!file && status === API_STATUS_TYPES.loading && (
            <div className={styles.loader}>
              <LoadingSpin primaryColor="#b8b6b6" size="30px" />
              Uploading video...
            </div>
          )}
          {file && (
            <div className={styles.uploadContainer}>
              <VideoPlayer videoUrl={url} />
            </div>
          )}
        </div>

        <div className={styles.socialBehaviour}>
          <div className={styles.comment}>Comment</div>
          <div className={styles.comment}>Export</div>
          <div className={styles.comment}>Share</div>
        </div>

        <div className={styles.container}>
          <div className={styles.videoContainer}>
            {<ControlSelection trackUrl={track} />}
            {/* <ControlPanel /> */}
          </div>
        </div>
      </div>
      <div className={styles.compositionWrapper}>
        <img
          className={styles.compositionBackground}
          src={compositionBackground}
          alt="composition-background"
        />
        <CompositionContainer />
        {timeFrames?.length &&
          timeFrames?.map((timeFrame, index) => (
            <div className={styles.trackWrapper}>
              <DndProvider backend={HTML5Backend}>
                {renderDraggableItem(
                  timeFrame.generatedData?.urls as string[],
                  timeFrame.id
                )}
              </DndProvider>
            </div>
          ))}
      </div>

      {/* {url && <ControlSeconds trackId={url} />} */}
    </section>
  );
};

export default ResultDashboard;
