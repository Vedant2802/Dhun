// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";
import { STUDIO_CONSTANTS } from "../../utils/genAiConstant";
import ControlSelection from "../controlSelection/ControlSelection";
import * as React from "react";

const ResultDashboard = () => {
  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    FormD.append("file", event.target.files[0]);
    // uploadFile(FormD);
  };
  const url =
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <>
      <div className={styles.uploadContainer}>
        <div className={styles.uploadTextContainer}>
          <div className={styles.videoFileName}>final episode 2344.mp4</div>
          <div className={styles.replace}>{STUDIO_CONSTANTS.REPLACE_VIDEO}</div>
          <input
            type="file"
            id="myFile"
            name="filename"
            accept="video/mp4,video/x-m4v,video/*"
            className={styles.videoUpload}
            onChange={onFileUpload}
          ></input>
        </div>
        <VideoPlayer videoUrl={url} />
      </div>
      {/* {url && <ControlPanel />} */}
      {url && <ControlSelection trackUrl={url} />}
      {/* {url && <ControlSeconds trackId={url} />} */}
    </>
  );
};

export default ResultDashboard;
