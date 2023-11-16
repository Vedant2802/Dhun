import styles from "./Header.module.scss";
import logo from "../../../public/icons/topLogo.svg";
import raag from "../../../public/icons/raagAi.svg";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.HeaderTitleContainer}>
        <img src={logo} alt="appLogo" />
        <img src={raag} alt="raag" />
      </div>
      <div className={styles.HeaderIcon}>A</div>
    </div>
  );
};

export default Header;
