import React, { useState } from "react";
import HomeHeader from "../../components/homeHeader/homeHeader";
import styles from "../../pages/DhunAi/DhunAi.module.scss";
import ContactPopup from "../../components/contactPopup/ContactPopup";

const HomePageHeader = () => {
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
    </div>
  );
};

export default HomePageHeader;
