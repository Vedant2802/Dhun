// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";
import { STUDIO_CONSTANTS } from "../../utils/genAiConstant";
import ControlSelection from "../controlSelection/ControlSelection";
import React, { useState } from "react";
import ControlPanel from "../ControlsPanel/ControlPanel";
import { useGenerateStore } from "../../stores/generateStore";
import CompositionContainer from "../compositionContainer/compositionContainer";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import LoadingSpin from "react-loading-spin";

const ResultDashboard = () => {
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const { uploadFile, file, status }: any = useGenerateStore((state) => state);
  
  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    FormD.append("file", event.target.files[0]);
    uploadFile && uploadFile(FormD);
  };
  console.log("file", file);
  const trackUrl = file?.gcs_url;
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const track = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  return (
    <div>
      <div>
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
              <div>+ Add video or vocals</div>
            </div>
          )}
          {status === API_STATUS_TYPES.loading && (
            <div className={styles.loader}>
              <LoadingSpin primaryColor="#b8b6b6" size="30px" />
              Uploading video...
            </div>
          )}
          {file && (
            <div className={styles.uploadContainer}>
              <VideoPlayer videoUrl={trackUrl} />
            </div>
          )}
        </div>

        <div className={styles.socialBehaviour}>
          <div className={styles.comment}>Comment</div>
          <div className={styles.comment}>Export</div>
          <div className={styles.comment}>Share</div>
        </div>
        <div className={styles.container}>
         <CompositionContainer />
          <div className={styles.videoContainer}>
            {<ControlSelection trackUrl={track} />}
          </div>
        </div>
        {/* {url && <ControlPanel />} */}
        {/* {url && <ControlSeconds trackId={url} />} */}
      </div>
    </div>
  );
};

export default ResultDashboard;
