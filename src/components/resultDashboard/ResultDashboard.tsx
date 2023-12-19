// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";
import ControlSelection from "../controlSelection/ControlSelection";
import React, { useEffect, useState } from "react";
import CompositionContainer from "../compositionContainer/compositionContainer";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import LoadingSpin from "react-loading-spin";
import compositionBackground from "../../../public/timeframeBackground.svg";
import Emptycheckbox from "../../../public/icons/Empty checkbox.png";
import checkbox from "../../../public/icons/Checkbox.png";
import close from "../../../public/icons/Close.png";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../DraggableItem/DraggableItem";
import DraggableWrapper from "../DraggableWrapper/DraggableWrapper";
import { useGenerateStore } from "../../stores/generateStore";

const ResultDashboard = () => {
  const { uploadFile, file, status, exportMusicData, exportedMusicData }: any =
    useGenerateStore((state: any) => state);
  const timeFrames = useGenerateStore((state) => state.timeFrameData);
  const setUser = useGenerateStore((state) => state.setUser);
  const [exportComp, setExportComp] = useState<boolean>(false);
  const [trackSelected, setTrackSelected] = useState<Array<string>>([]);
  // const currentTimeFrameId = useGenerateStore(
  //   (state) => state.currentTimeFrameId
  // );

  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    const fileName = event.target.files[0].name;
    FormD.append("file", event.target.files[0]);
    uploadFile(FormD, fileName);
  };

  const handleTrackSelection = (Track: string) => {
    if (trackSelected.includes(Track)) {
      setTrackSelected((track) => {
        let newtrk = track.filter((trk) => trk !== Track);
        return newtrk;
      });
    } else {
      setTrackSelected([...trackSelected, Track]);
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    // const urls: any = timeFrames?.[0]?.generatedData?.urls
    // const updatedItems = [...urls];
    // const [movedItem] = updatedItems.splice(fromIndex, 1);
    // updatedItems.splice(toIndex, 0, movedItem);
    // setItems(updatedItems);
  };
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

  const exportMusicHandle = (e: any) => {
    e.preventDefault();
    let app = timeFrames?.[0]?.generatedData?.urls;
    if (app && Array.isArray(app)) {
      const req = {
        audio_urls: [...app],
      };
      exportMusicData(req);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    console.log("user", user);
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <section>
      {exportComp && (
        <div className={styles.exportPopup}>
          <div className={styles.exportHead}>
            <span className={styles.exportName}>Export</span>
            <img
              onClick={() => setExportComp(false)}
              src={close}
              className={styles.closeButton}
            />
          </div>
          <div
            onClick={() => handleTrackSelection("Composition 1")}
            className={styles.checkwrp}
          >
            <img
              className={styles.chckbox}
              src={`${
                trackSelected.indexOf("Composition 1") === -1
                  ? `${Emptycheckbox}`
                  : `${checkbox}`
              }`}
            />
            <p>Composition 1</p>
          </div>
          <div
            onClick={() => handleTrackSelection("Composition 2")}
            className={styles.checkwrp}
          >
            <img
              className={styles.chckbox}
              src={`${
                trackSelected.indexOf("Composition 2") === -1
                  ? `${Emptycheckbox}`
                  : `${checkbox}`
              }`}
            />
            <p>Composition 2</p>
          </div>
          <div
            onClick={() => handleTrackSelection("Composition 3")}
            className={styles.checkwrp}
          >
            <img
              className={styles.chckbox}
              src={`${
                trackSelected.indexOf("Composition 3") === -1
                  ? `${Emptycheckbox}`
                  : `${checkbox}`
              }`}
            />
            <p>Composition 3</p>
          </div>
          <button
            onClick={(e) => exportMusicHandle(e)}
            className={styles.exportbtn}
          >
            Export Selected
          </button>
        </div>
      )}
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
          <div onClick={() => setExportComp(true)} className={styles.comment}>
            Export
          </div>
          <div className={styles.comment}>Share</div>
        </div>

        <div className={styles.container}>
          <div className={styles.videoContainer}>
            {<ControlSelection trackUrl={url} />}
          </div>
          <div className={styles.compositionWrapper}>
            <img
              className={styles.compositionBackground}
              src={compositionBackground}
              alt="composition-background"
            />
            <CompositionContainer />
            {timeFrames?.length &&
              timeFrames?.map((timeFrame: any, index: number) => (
                <div className={styles.trackWrapper}>
                  <DndProvider backend={HTML5Backend}>
                    <DraggableWrapper
                      urls={timeFrame.generatedData?.urls as string[]}
                      id={timeFrame.id}
                    />
                    {/* {renderDraggableItem(
                      timeFrame.generatedData?.urls as string[],
                      timeFrame.id
                    )} */}
                  </DndProvider>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* {url && <ControlSeconds trackId={url} />} */}
    </section>
  );
};

export default ResultDashboard;
