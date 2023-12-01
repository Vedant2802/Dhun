import React from "react";
import DhunAiComponent from "../../components/DhunAiComponent/DhunAiComponent";
import OurFeature from "../../components/OurFeature/OurFeature";
import MonetizeTunes from "../../components/MonetizeTunes/MonetizeTunes";
import HomeHeader from "../../components/homeHeader/homeHeader";
import styles from "./DhunAi.module.scss";

const DhunAi = () => {
  return (
    <div className={styles.dhunai}>
      <div className={styles.topHeader}>
        <HomeHeader />
      </div>
      <DhunAiComponent />
      <OurFeature />
      <MonetizeTunes />
    </div>
  );
};

export default DhunAi;
