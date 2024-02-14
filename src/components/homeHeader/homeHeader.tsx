import React, { useState, useEffect } from "react";
import styles from "./homeHeader.module.scss";
import DhunIcon from "../../../public/icons/Dhun Icon.svg";
import menu from "../../../public/icons/menu.svg";
import closeicon from "../../../public/icons/close.svg";
import { MENUITEMS } from "../../utils/genAiConstant";
import { useNavigate } from "react-router-dom";
import { useGenerateStore } from "../../stores/generateStore";

const HomeHeader: React.FC<any> = ({ setShowContactPopup }) => {
  const navigate = useNavigate();
  const userData = useGenerateStore((state) => state.userData);
  const removeUser = useGenerateStore((state) => state.removeUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // const renderCTA = () => {
  //   if (userData?.data) {
  //     return (
  //       <div onClick={() => removeUser()} className={styles.login}>
  //         {"Logout"}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div onClick={() => navigate("/login")} className={styles.login}>
  //       {"Login/Register"}
  //     </div>
  //   );
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = (item: string) => {
    if (item === "Contact") {
      setShowContactPopup(true);
    } else if (item === "Features") {
      // Navigate to the featureContainerdiv
      const featureContainerDiv = document.getElementById("feature-section");
      if (featureContainerDiv) {
        featureContainerDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.dhunContainer}>
          <img className={styles.dhunImg} src={DhunIcon} alt="Dhun Icon" />
          <span className={styles.dhuntext}>Dhun.AI</span>
        </div>
        <div className={styles.menu}>
          <div className={styles.normalMenu}>
            {MENUITEMS.map((item, index) => (
              <div
                onClick={() => handleMenuItemClick(item)}
                className={styles.menuItems}
                id={String(index)}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {isMobile && !isOpen && (
          <div className={styles.mobileMenu} onClick={toggleSidebar}>
            <img className={styles.mobileMenu} src={menu} alt="Menu" />
          </div>
        )}
        {isMobile && isOpen && (
          <div className={styles.closeIcon} onClick={closeSidebar}>
            <img src={closeicon} alt="Close" />
          </div>
        )}
      </div>
      {isMobile && isOpen && (
        <div className={styles.mobileSideMenu}>
          <div className={styles.mobileHeader}>
            {/* Add this container for mweb */}
            <div className={styles.iconContainer}>
              <img src={DhunIcon} alt="Icon" />
            </div>
            <span style={{ fontSize: "28px", marginLeft: "10px" }}>
              Dhun.AI
            </span>
            <div className={styles.closeIcon} onClick={closeSidebar}>
              <img src={closeicon} alt="Close" />
            </div>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              {MENUITEMS.map((item, index) => (
                <div
                  onClick={(e) => {
                    if (item === "Contact") {
                      setShowContactPopup(true);
                    } else if (item === "Features") {
                      handleMenuItemClick(item);
                      setIsOpen(false); // Close the sidebar after clicking on "Features"
                    }
                  }}
                  className={styles.menuItems}
                  id={String(index)}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeHeader;
