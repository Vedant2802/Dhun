import * as React from "react";
import styles from "./homeHeader.module.scss";
import DhunIcon from "../../../public/icons/Dhun Icon.svg";
import menu from "../../../public/icons/menu.svg";
import { MENUITEMS } from "../../utils/genAiConstant";
import { useNavigate } from "react-router-dom";
import { useGenerateStore } from "../../stores/generateStore";

const HomeHeader: React.FC<any> = ({ setShowContactPopup }) => {
  const navigate = useNavigate();
  const userData = useGenerateStore((state) => state.userData);
  const removeUser = useGenerateStore((state) => state.removeUser);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.dhunContainer}>
          <img className={styles.dhunImg} src={DhunIcon} />
          <span className={styles.dhuntext}>Dhun.AI</span>
        </div>
        <div className={styles.menu}>
          <div className={styles.mobileMenu}>
            <img className={styles.mobileMenu} src={menu} />
          </div>
          <div className={styles.normalMenu}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
