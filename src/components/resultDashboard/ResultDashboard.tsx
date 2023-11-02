// import UploadVideo from "../uploadVideo/UploadVideo";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import styles from "./ResultDashboard.module.scss";

const ResultDashboard = () => {
  return (
    <>
      <div className={styles.uploadContainer}>
        <VideoPlayer />
      </div>
    </>
  );
};

export default ResultDashboard;
