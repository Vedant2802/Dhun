// import styles from "./UploadVideo.module.scss";
// // import uploadIcon from "../../../public/icons/upload.svg";
// // import { STUDIO_CONSTANTS } from "../../utils/genAiConstant";
// // import axiosInstance from "../../axiosConfig/axiosConfig";
// import VideoPlayer from "../videoPlayer/VideoPlayer";

// const UploadVideo = () => {
//   // const onFileUpload = (event: any) => {
//   //   console.log("check click ", event);
//   //   const FormD: any = new FormData();
//   //   FormD.append("file", event.target.files[0]);
//   //   uploadFile(FormD);
//   // };

//   // const uploadFile = async (uploadFile: any) => {
//   //   try {
//   //     const data: any = await axiosInstance.post("/api/upload", uploadFile, {
//   //       auth: {
//   //         username: "raaga",
//   //         password: "4S5Ek7un16Qc",
//   //       },
//   //     });
//   //     console.log(data, "data");
//   //     if (data) return data;
//   //   } catch (e) {
//   //     return e;
//   //   }
//   // };

//   // const uploadFile = (uploadFile: any) => {
//   //   const url = "https://musicgenai.zee5.com/api/upload";
//   //   var user = "raaga";
//   //   var pass = "4S5Ek7un16Qc";

//   //   var authorizationBasic = window.btoa(user + ":" + pass);
//   //   return fetch(url, {
//   //     method: "POST",
//   //     body: uploadFile,
//   //     headers: {
//   //       authorization: "Basic " + authorizationBasic,
//   //     },
//   //   });
//   // };

//   return (
//     <>
//       {/* <div className={styles.uploadVideo}>
//         <div>
//           <img src={uploadIcon} alt="downloadIcon" />
//         </div>
//         <div className={styles.uploadtext}>
//           {STUDIO_CONSTANTS.GENERATING_COMPOSITION}
//         </div>
//         <input
//           type="file"
//           id="myFile"
//           name="filename"
//           accept="video/mp4,video/x-m4v,video/*"
//           className={styles.videoUpload}
//           onChange={onFileUpload}
//         ></input>
//       </div> */}
//       <VideoPlayer />
//     </>
//   );
// };

// export default UploadVideo;
