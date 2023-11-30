// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";
import { STUDIO_CONSTANTS } from "../../utils/genAiConstant";
import ControlSelection from "../controlSelection/ControlSelection";
import React, { useState } from "react";
import ControlPanel from "../ControlsPanel/ControlPanel";
import { useGenerateStore } from "../../stores/generateStore";

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
          <div className={styles.compositionContainer}>
                <div className={styles.composition}>
                    <div className={styles.playButtonContainer}>
                      <svg className={styles.playButton} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16.0001 2.66675C8.64008 2.66675 2.66675 8.64008 2.66675 16.0001C2.66675 23.3601 8.64008 29.3334 16.0001 29.3334C23.3601 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.3601 2.66675 16.0001 2.66675ZM13.3334 22.0001V10.0001L21.3334 16.0001L13.3334 22.0001Z" fill="#7357FF"/>
                      </svg>
                      <span className={styles.compositionText}>Composition 1</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fillRule="evenodd" clip-rule="evenodd" d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#ADADAD"/>
                    </svg>
                </div>
                <div className={styles.composition}>
                    <div className={styles.playButtonContainer}>
                      <svg className={styles.playButton} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16.0001 2.66675C8.64008 2.66675 2.66675 8.64008 2.66675 16.0001C2.66675 23.3601 8.64008 29.3334 16.0001 29.3334C23.3601 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.3601 2.66675 16.0001 2.66675ZM13.3334 22.0001V10.0001L21.3334 16.0001L13.3334 22.0001Z" fill="#7357FF"/>
                      </svg>
                      <span className={styles.compositionText}>Composition 2</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fillRule="evenodd" clip-rule="evenodd" d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#ADADAD"/>
                    </svg>
                </div>
                <div className={styles.composition}>
                    <div className={styles.playButtonContainer}>
                      <svg className={styles.playButton} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16.0001 2.66675C8.64008 2.66675 2.66675 8.64008 2.66675 16.0001C2.66675 23.3601 8.64008 29.3334 16.0001 29.3334C23.3601 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.3601 2.66675 16.0001 2.66675ZM13.3334 22.0001V10.0001L21.3334 16.0001L13.3334 22.0001Z" fill="#7357FF"/>
                      </svg>
                      <span className={styles.compositionText}>Composition 3</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fillRule="evenodd" clip-rule="evenodd" d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#ADADAD"/>
                    </svg>
                </div>
            </div>
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
