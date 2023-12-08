import React, { useState, useEffect } from "react";
import styles from "./MonetizeTunes.module.scss";
import spectrum from "../../../public/icons/spectrum.svg";
import monitizeLogo from "../../../public/icons/monitizeLogo.svg";
import arrow from "../../../public/icons/right-arrow.svg";
import Symphonies from "../sympohonies/Symphonies";
import DhunIcon from "../../../public/icons/Dhun Icon.svg";
import heart from "../../../public/icons/heart.svg";
import WebModal from "../webGenerateModal/WebModal";
import { createPortal } from "react-dom";
import { useGenerateStore } from "../../stores/generateStore";
import { useNavigate } from "react-router";

const MonetizeTunes = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const userData = useGenerateStore((state) => state.userData);
  const navigate = useNavigate();
  const openPrompt = () => {
    if (!userData?.data) {
      return navigate("/login");
    }
    setOpenModal(true);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: any) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);
  return (
    <div>
      <div className={styles.spectrumContainer}>
        <img src={spectrum} alt="" className={styles.spectrumImage} />
      </div>
      <Symphonies />
      <div className={styles.monetizeMainContainer}>
        <div className={styles.monetizeContainer}>
          <div className={styles.createText}>
            Ready to create, own &<br />
            monetise your tunes?
          </div>
          <div className={styles.createSubText}>
            Join Dhun.ai and unlock the magic of creating music.
          </div>
          <div className={styles.button} onClick={openPrompt}>
            Create magic now <img className={styles.arrow} src={arrow} />
          </div>
          {openModal &&
            userData?.data &&
            createPortal(<WebModal closePopup={setOpenModal} />, document.body)}
        </div>
      </div>
      <div className={styles.footer}>
        <img src={DhunIcon} alt="DhunIcon" />
        <div>dhun.ai &nbsp; / &nbsp; Developed with by </div>
        <img src={heart} alt="heart" />
        <div>zee entertainment</div>
      </div>
    </div>
  );
};

export default MonetizeTunes;
