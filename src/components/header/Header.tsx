import styles from "./Header.module.scss";
import logo from "../../../public/icons/dhun.svg";
import userIcon from "../../../public/icons/user.svg";
import notificationIcon from "../../../public/icons/notification.svg";
import musicIcon from "../../../public/icons/music.svg";
import React from "react";
import FileTitle from "../fileTitle/FileTitle";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.HeaderTitleContainer}>
        <img src={logo} alt="appLogo" />
        <h4 className={styles.logoName}>Dhun.ai</h4>
      </div>
      <FileTitle />
      <div className={styles.iconsContainer}>
        <div className={styles.icon}>
          <img src={notificationIcon} alt="notification" />
        </div>
        <div className={styles.icon}>
          <img src={musicIcon} alt="music" />
        </div>
        <div className={styles.icon}>
          <img src={userIcon} alt="user" />
        </div>
      </div>
    </header>
  );
};

export default Header;
