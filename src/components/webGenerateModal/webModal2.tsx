import React, { useEffect, useRef, useState } from "react";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./webModal2.module.scss";
import playIcon from "../../../public/icons/play.svg";
import pauseIcon from "../../../public/icons/pauseWhite.svg";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import closeicon from "../../../public/icons/close.svg";
import musicbutton from "../../../public/icons/music-button.svg";
import plus from "../../../public/icons/plus.svg";
import uploadbutton from "../../../public/icons/upload-button.svg";
import stopCreatingSvg from "../../../public/icons/stopCreating.svg";
import artistimage from "../../../public/icons/Artist image.png";
import { Player } from "@lottiefiles/react-lottie-player";
import playBlack from "../../../public/icons/playBlack.svg";

enum UPLOADED_DEFAULT_MUSIC_REFERENCES {
  brunoMars = "http://dhun.centralindia.cloudapp.azure.com/storage/grenade 2.wav",
  gotMusic = "http://dhun.centralindia.cloudapp.azure.com/storage/Game of thrones 1.wav",
}

enum DEFAULT_PROMPTS {
  prompt1 = "Upbeat, spiritual music",
  prompt2 = "Indian, soulful, timeless, melody",
  prompt3 = "Upbeat, spiritual music, Upbeat music",
  prompt4 = "Indian,Soul",
}

const defaultReqObj = {
  generation_type: "melody-to-music",
};

type webmodalprops = {
  closePopup: Function;
};

const WebModal2 = ({ closePopup }: webmodalprops) => {
  const [prompt, setPrompt] = useState<string>("");
  const [isChibBtn1Selected, setChibBtn1Selected] = useState<boolean>(false);
  const [isChibBtn2Selected, setChibBtn2Selected] = useState<boolean>(false);
  const [fileSizeError, setFileSizeError] = useState("");
  const [fileName, setFileName] = useState("");
  const videoRef: any = useRef<any>(null);
  const [filePath, setFilePath] = useState("");
  const uploadFile = useGenerateStore((state) => state.uploadFile);
  const setUser = useGenerateStore((state) => state.setUser);
  // const generateMusic = useGenerateStore(
  //   (state) => state.generateMusicForWebsite
  // );
  const generateMusic = useGenerateStore(
    (state) => state.generateMusicForWebsiteTask
  );
  const setCurrentMusicSrc = useGenerateStore(
    (state) => state.setCurrentMusicSrc
  );
  const updateMusicPlayingStatus = useGenerateStore(
    (state) => state.updateMusicPlayingStatus
  );
  const currentMusicSrc = useGenerateStore((state) => state.currentMusicSrc);
  const isMusicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const uploadfile = useGenerateStore((state) => state?.file);
  const resetWebsiteData = useGenerateStore((state) => state.resetWebsiteData);
  const { status, musicUrls } = useGenerateStore((state) => ({
    status: state.websiteData.status,
    musicUrls: state.websiteData.musicUrls,
  }));
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  console.log("uploadfile", uploadfile);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const fileObject = {
      ...defaultReqObj,
      file_name: uploadfile?.file_name,
    };
    generateMusic({ ...fileObject, prompt });
  };

  useEffect(() => {
    if (isChibBtn1Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt1 });
    }
    if (isChibBtn2Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt2 });
    }
  }, [isChibBtn1Selected, isChibBtn2Selected]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    if (user) {
      setUser(user);
    }
    resetState();
  }, []);

  const togglePlay = (musicSrc: string) => {
    if (isMusicPlaying && currentMusicSrc === musicSrc) {
      return updateMusicPlayingStatus(false);
    }
    setCurrentMusicSrc(musicSrc);
  };

  const resetState = () => {
    resetWebsiteData();
    setChibBtn1Selected(false);
    setChibBtn2Selected(false);
    setPrompt("");
    setFileName("");
    // setVideoPath("");
  };

  const getMusicIcon = (musicSrc: string) => {
    return musicSrc === currentMusicSrc && isMusicPlaying
      ? pauseIcon
      : playIcon;
  };

  const loadingTexts = [
    "Waiting to start…",
    "Analyzing your melody to understand its unique characteristics...",
    "Experimenting with harmonies and rhythms to develop fresh interpretations..",
    "Refining the harmonies and chord progressions to evoke the right emotions...",
    "Polishing the arrangement to create a captivating musical journey..",
    "Mastering the final mix to achieve professional-grade sound quality...",
  ];

  useEffect(() => {
    let timeout: number | undefined;
    if (status === "loading") {
      // Update loading text index every 10 seconds
      timeout = setTimeout(() => {
        setLoadingTextIndex(
          (prevIndex) => (prevIndex + 1) % loadingTexts.length
        );
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [status, loadingTextIndex]);

  const renderMusicUrls = () => {
    if (musicUrls && musicUrls.length) {
      return (
        <div className={styles.loadingChip}>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[0])}
          >
            <img src={getMusicIcon(musicUrls[0])} alt="playIcon" />
            <div>Track 1</div>
          </div>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[1])}
          >
            <img src={getMusicIcon(musicUrls[1])} alt="playIcon" />
            <div>Track 2</div>
          </div>
          <div
            className={styles.chip1}
            onClick={() => togglePlay(musicUrls[2])}
          >
            <img src={getMusicIcon(musicUrls[2])} alt="playIcon" />
            <div>Track 3</div>
          </div>
          <div className={styles.createButton} onClick={resetState}>
            Create more music
          </div>
        </div>
      );
    }
    return null;
  };

  const onVideoFileUpload = (event: any) => {
    const FormD: any = new FormData();
    const fileName = event.target.files[0].name;
    setFileName(fileName);
    setFileSizeError("");
    FormD.append("file", event.target.files[0]);
    uploadFile(FormD, fileName);
  };

  const SelectedItemBox = ({
    text,
    onClose,
  }: {
    text: string;
    onClose: () => void;
  }) => {
    return (
      <div className={styles.selectedItemBox}>
        <span className={styles.selectedItemText}>{text}</span>
        <img
          src={closeicon}
          alt="Close"
          className={styles.closeIcon2}
          onClick={onClose}
        />
      </div>
    );
  };

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const selectLibraryItem = (itemName: string) => {
    setSelectedItem(itemName);
  };

  const clearSelectedItem = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (currentMusicSrc && isMusicPlaying && videoRef?.current) {
      videoRef.current.currentTime = 0;
      videoRef?.current?.play();
    }
    if (!isMusicPlaying && videoRef?.current) {
      videoRef?.current?.pause();
    }
  }, [currentMusicSrc, isMusicPlaying]);

  const clearUpload = () => {};

  return (
    <dialog className={styles.webDialog}>
      <form className={styles.generatePopup} onSubmit={handleOnSubmit}>
        <div className={styles.topCardDiv}>
          <div className={styles.topDiv}>
            <p className={styles.closeIconwhite}></p>
            <p className={styles.topCardText}>Create melody &rarr; music</p>
          </div>

          <button className={styles.closeIconWrapper}>
            <img
              className={styles.closeIcon}
              src={closeicon}
              onClick={() => closePopup(false)}
            />
          </button>
        </div>
        {/* {status === API_STATUS_TYPES.success && musicUrls?.length ? (
          renderMusicUrls() */}
        {status === API_STATUS_TYPES.success ? (
          <>
            {/* Render prompt with selected item box */}
            <div className={styles.chipinputwrapper}>
              <div className={styles.chip}>
                {selectedItem && (
                  <SelectedItemBox
                    text={selectedItem}
                    onClose={clearSelectedItem}
                  />
                )}
                <input
                  name="prompt"
                  className={styles.chipInput}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the music you wish to create. Try an Indian variation of the song"
                  value={prompt}
                />
                <div
                  className={`${styles.musicButton} ${
                    prompt.trim() === "" ? styles.disabled : ""
                  }`}
                  onClick={(e) => {
                    // Check if the prompt is empty or not
                    if (prompt.trim() !== "") {
                      handleOnSubmit(e);
                    }
                  }}
                >
                  <img src={musicbutton} />
                  <div className={styles.generate}>Generate</div>
                </div>
              </div>
            </div>

            {/* Render musicUrls if available */}
            {musicUrls && musicUrls?.length > 0 && renderMusicUrls()}
          </>
        ) : (
          <>
            <div className={styles.chipWrapper}>
              {status === API_STATUS_TYPES.loading ? (
                <>
                  {/* {renderLoadingBtns()} */}
                  {prompt && (
                    <div className={styles.promptContainer}>
                      {selectedItem && (
                        <SelectedItemBox
                          text={selectedItem}
                          onClose={clearSelectedItem}
                        />
                      )}
                      {/* Render the divider if both prompt and selected item are present */}
                      {prompt && selectedItem && (
                        <div className={styles.divider}></div>
                      )}
                      <div>{prompt}</div>
                    </div>
                  )}
                  <div className={styles.loadingText}>
                    {loadingTexts[loadingTextIndex]}
                  </div>
                  <Player
                    src="https://amlzee5sbci1mu5120768980.blob.core.windows.net/dhunai/visualization1.json?sp=r&st=2024-01-29T08:08:31Z&se=2025-01-01T16:08:31Z&sv=2022-11-02&sr=b&sig=%2BdhuFDIA4l8f35Rq5Mar1GhNMDq1DNA5HxZ6YTkltu4%3D"
                    className="player"
                    loop
                    autoplay
                    style={{ height: "200px", width: "100%" }}
                  />
                  {/* <div className={styles.stopCreatingBtn}>
                    Generating your music tracks...
                  </div>
                  <button
                    className={styles.stopCreatingBtn}
                    onClick={() => resetState()}
                  >
                    <img src={stopCreatingSvg} alt="stop creating" />
                    Stop creating
                  </button> */}
                </>
              ) : (
                <>
                  {uploadfile?.file_name ? (
                    <div
                      className={`${styles.uploadButton} ${styles.uploadedMusic}`}
                    >
                      <div
                        className={styles.musicButtonUpload}
                        onClick={() =>
                          togglePlay(
                            "http://dhun.centralindia.cloudapp.azure.com/api-test/download/5f3cfb62-1fcd-4eeb-880b-add761689950.wav"
                          )
                        }
                      >
                        <img className={styles.uploadIcon} src={playBlack} />
                      </div>
                      <div className={styles.uploadedFileClose}>
                        <span className={styles.musicButtonText}>
                          Uploaded music
                        </span>
                        <img
                          className={styles.closeIcon}
                          src={closeicon}
                          alt="closeIcon"
                          onClick={clearUpload}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={styles.suggestionbtn}>
                        <img src={plus} />
                        <p className={styles.suggestiontext}>
                          Add reference music
                        </p>
                      </div>
                      <div className={styles.uploadButton}>
                        <div className={styles.musicButtonUpload}>
                          <img
                            className={styles.uploadIcon}
                            src={uploadbutton}
                          />
                        </div>
                        <span className={styles.musicButtonText}>
                          Upload your music
                        </span>
                        <input
                          type="file"
                          id="uploadVideo"
                          name="filename"
                          // accept="video/mp4,video/x-m4v,video/*"
                          onChange={onVideoFileUpload}
                          className={styles.videoUpload}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className={styles.suggestiontext}>
                      or choose from our library
                    </div>
                    <div className={styles.libraryMusic}>
                      <div
                        onClick={() => selectLibraryItem("Bruno")}
                        className={styles.audiofiles}
                      >
                        <img src={artistimage} className={styles.artistimg} />
                        <span className={styles.artistsongtext}>
                          Grenade by Bruno Mars
                        </span>
                      </div>
                      <div
                        onClick={() => selectLibraryItem("GOT")}
                        className={styles.audiofiles}
                      >
                        <img src={artistimage} className={styles.artistimg} />
                        <span className={styles.artistsongtext}>
                          Streets of London by R McTell
                        </span>
                      </div>
                    </div>
                    <div className={styles.chipinputwrapper}>
                      <div className={styles.chip}>
                        {selectedItem && (
                          <SelectedItemBox
                            text={selectedItem}
                            onClose={clearSelectedItem}
                          />
                        )}
                        <input
                          name="prompt"
                          className={styles.chipInput}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Describe the music you wish to create. Try an Indian variation of the song"
                        />
                        <div
                          className={`${styles.musicButton} ${
                            prompt.trim() === "" ? styles.disabled : ""
                          }`}
                          onClick={(e) => {
                            // Check if the prompt is empty or not
                            if (prompt.trim() !== "") {
                              handleOnSubmit(e);
                            }
                          }}
                        >
                          <img src={musicbutton} />
                          <div className={styles.generate}>Generate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </form>
      <AudioPlayer />
    </dialog>
  );
};

export default WebModal2;
