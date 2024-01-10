import React, { useState, useEffect } from "react";
import styles from "./MonetizeTunes.module.scss";
import contactUs from "../../../public/icons/contactPage.svg";
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
    <div className={styles.mainTune}>
      <img className={styles.image} src={contactUs} />
      <div className={styles.tunes}>
        <Symphonies />
        <div className={styles.footer}>
          <img src={DhunIcon} alt="DhunIcon" />
          <div>dhun.ai &nbsp; / &nbsp; Developed With</div>
          <img src={heart} alt="heart" />
          <div>By Zee Entertainment</div>
        </div>
      </div>
    </div>
  );
};

export default MonetizeTunes;
