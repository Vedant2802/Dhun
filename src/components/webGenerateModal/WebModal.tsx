import React, { useEffect, useState } from "react";
import { API_STATUS_TYPES } from "../../assets/constants/apiContants";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./WebModal.module.scss";

enum DEFAULT_PROMPTS {
  prompt1 = "Upbeat, spiritual music",
  prompt2 = "Indian, soulful, timeless, melody",
}

const defaultReqObj = {
  email: "test@gmail.com",
  image_url: "",
};

const WebModal = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isChibBtn1Selected, setChibBtn1Selected] = useState<boolean>(false);
  const [isChibBtn2Selected, setChibBtn2Selected] = useState<boolean>(false);
  const generateMusic = useGenerateStore(
    (state) => state.generateMusicForWebsite
  );
  const { status, musicUrls } = useGenerateStore((state) => ({
    status: state.websiteData.status,
    musicUrls: state.websiteData.musicUrls,
  }));

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    generateMusic({ ...defaultReqObj, prompt });
  };

  useEffect(() => {
    if (isChibBtn1Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt1 });
    }
    if (isChibBtn2Selected) {
      generateMusic({ ...defaultReqObj, prompt: DEFAULT_PROMPTS.prompt2 });
    }
  }, [isChibBtn1Selected, isChibBtn2Selected]);

  const chibBtnStyle = (selected: boolean) => {
    return selected ? styles.chibBtnActive : styles.chipBtn;
  };

  const renderLoadingBtns = () => {
    return Array(3)
      .fill("")
      .map((_, index: number) => {
        return <div key={index} className={styles.loadingBtn}></div>;
      });
  };

  return (
    <dialog className={styles.webDialog}>
      <form className={styles.generatePopup} onSubmit={handleOnSubmit}>
        <div className={styles.topCard}></div>
        <div className={styles.chipWrapper}>
          {status === API_STATUS_TYPES.loading ? (
            renderLoadingBtns()
          ) : (
            <>
              <div>
                <input
                  name="prompt"
                  className={styles.chip}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What melody do you want to create? "
                />
              </div>
              <button
                className={chibBtnStyle(isChibBtn1Selected)}
                onClick={(e) => {
                  e.preventDefault();
                  setChibBtn1Selected(!isChibBtn1Selected);
                }}
              >
                Upbeat, spiritual music
              </button>
              <button
                className={chibBtnStyle(isChibBtn2Selected)}
                onClick={(e) => {
                  e.preventDefault();
                  setChibBtn2Selected(!isChibBtn2Selected);
                }}
              >
                Indian, soulful, timeless, melody
              </button>
            </>
          )}
          <button type="submit" className={styles.createButton}>
            {status === API_STATUS_TYPES.loading ? "Generating..." : "Create"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default WebModal;
