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
  const track = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  return (
    <>
      <div className={styles.uploadContainer}>
        <VideoPlayer videoUrl={url} />
      </div>
      <div className={styles.socialBehaviour}>
        <div className={styles.comment}>Comment</div>
        <div className={styles.comment}>Export</div>
        <div className={styles.comment}>Share</div>
      </div>
      {url && <ControlSelection trackUrl={track} />}
      {/* {url && <ControlPanel />} */}
      {/* {url && <ControlSeconds trackId={url} />} */}
    </>
  );
};

export default ResultDashboard;
