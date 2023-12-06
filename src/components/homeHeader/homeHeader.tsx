import * as React from "react";
import styles from "./homeHeader.module.scss";
import DhunIcon from "../../../public/icons/Dhun Icon.svg";
import { MENUITEMS } from "../../utils/genAiConstant";
import { useNavigate } from "react-router-dom";

const HomeHeader: React.FC<any> = ({ setShowContactPopup }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.dhunContainer}>
          <img src={DhunIcon} />
          <span className={styles.dhuntext}>Dhun.AI</span>
        </div>
        <div className={styles.menu}>
          {MENUITEMS.map((item, index) => (
            <div
              onClick={(e) => {
                if (item === "Contact") {
                  setShowContactPopup(true);
                }
              }}
              className={styles.menuItems}
              id={String(index)}
            >
              {item}
            </div>
          ))}
          <div onClick={() => navigate("/login")} className={styles.login}>
            Login/Register
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
