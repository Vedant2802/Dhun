import styles from "./addVideo.module.scss";
import addicon from "../../../public/icons/add.svg";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useNavigate } from "react-router";

const AddVideo = () => {
  const navigate = useNavigate();

  const onFileUpload = (event: any) => {
    const FormD: any = new FormData();
    FormD.append("file", event.target.files[0]);
    uploadFile(FormD);
  };

  const uploadFile = async (uploadFile: any) => {
    try {
      const data: any = await axiosInstance.post("/api/upload", uploadFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: "raaga",
          password: "4S5Ek7un16Qc",
        },
      });
      if (data && data?.data?.gcs_url) {
        navigate("/dashboard");
      }
      if (data) return data;
    } catch (Error) {
      console.log("Error on uploading file");
      return Error;
    }
  };

  // const uploadFile = (uploadFile: any) => {
  //   const url = "https://musicgenai.zee5.com/api/upload";
  //   var user = "raaga";
  //   var pass = "4S5Ek7un16Qc";

  //   var authorizationBasic = window.btoa(user + ":" + pass);
  //   return fetch(url, {
  //     method: "POST",
  //     body: uploadFile,
  //     headers: {
  //       authorization: "Basic " + authorizationBasic,
  //     },
  //   });
  // };

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
