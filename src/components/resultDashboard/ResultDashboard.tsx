// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";
import { STUDIO_CONSTANTS } from "../../utils/genAiConstant";
import ControlSelection from "../controlSelection/ControlSelection";
import compositionContainer from "../compositionContainer/compositionContainer";
import React, { useState } from "react";
import ControlPanel from "../ControlsPanel/ControlPanel";
import { useGenerateStore } from "../../stores/generateStore";
import CompositionContainer from "../compositionContainer/compositionContainer";

const ResultDashboard = () => {
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const { uploadFile, file, status } = useGenerateStore((state) => state);

  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    FormD.append("file", event.target.files[0]);
    uploadFile && uploadFile(FormD);
  };
  console.log("file", file);
  const url =
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const track = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  return (
    <div >         
         

        <div >
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
            <CompositionContainer />
            <div className={styles.videoContainer}>
            {url && <ControlSelection trackUrl={track} />}
            </div>
            
          </div>
          {/* {url && <ControlPanel />} */}
          {/* {url && <ControlSeconds trackId={url} />} */}
        </div>
    </div>

  );
};

export default ResultDashboard;
