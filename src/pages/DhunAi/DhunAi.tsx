import React, { useState } from "react";
import DhunAiComponent from "../../components/DhunAiComponent/DhunAiComponent";
import OurFeature from "../../components/OurFeature/OurFeature";
import MonetizeTunes from "../../components/MonetizeTunes/MonetizeTunes";
import HomeHeader from "../../components/homeHeader/homeHeader";
import ContactPopup from "../../components/contactPopup/ContactPopup";
import styles from "./DhunAi.module.scss";
import VideoComponent from "../../components/videoComponent/VideoComponent";

const DhunAi = () => {
  const [showContactPopup, setShowContactPopup] = useState<boolean>(false);

  const handleTogglePopup = () => {
    setShowContactPopup(!showContactPopup);
  };

  return (
    <div className={styles.dhunai}>
      <div className={styles.topHeader}>
        <HomeHeader setShowContactPopup={setShowContactPopup} />
      </div>
      <div className={styles.popup}>
        {showContactPopup && <ContactPopup onClose={handleTogglePopup} />}
      </div>
      {/* <DhunAiComponent /> */}
      <VideoComponent />
      <OurFeature />
      <MonetizeTunes />
    </div>
  );
};

export default DhunAi;
