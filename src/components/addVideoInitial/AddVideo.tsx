import * as React from "react";
import { useNavigate } from "react-router";
import styles from "./addVideo.module.scss";
import addicon from "../../../public/icons/add.svg";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";

const AddVideo = () => {
  const navigate = useNavigate();

  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    FormD.append("file", event.target.files[0]);
  };

  React.useEffect(() => {
    if (status === API_STATUS_TYPES.success) {
      navigate("/dashboard");
    }
  }, [status]);

  return (
    <>
      <div className={styles.generateContainer}>
        <div className={styles.generate}>
          <div className={styles.generateHeader}>
            Generate BGM for any video
          </div>
          <div className={styles.generateTitle}>
            Generate background music using AI in less than 30 sec. Set your own
            parameters, emotions, genres. Fasten your workflow
          </div>
          <div className={styles.addVideoButton}>
            <input
              type="file"
              id="myFile"
              name="filename"
              accept="video/mp4,video/x-m4v,video/*"
              className={styles.videoUpload}
              onChange={onFileUpload}
            ></input>
            <div>
              <img src={addicon} alt="addIcon" />
            </div>
            <div>Add Video</div>
          </div>
        </div>
        <div className={styles.existingProject}>
          <div className={styles.project}>No existing projects yet</div>
        </div>
      </div>
    </>
  );
};

export default AddVideo;
