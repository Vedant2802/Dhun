import React, { useState, useEffect } from "react";
import styles from "./MonetizeTunes.module.scss";
import dhun2 from "../../../public/icons/dhun2.svg";
import adpod from "../../../public/icons/adpod.svg";
import DhunIcon from "../../../public/icons/Dhun Icon.svg";
import { useGenerateStore } from "../../stores/generateStore";
import { useNavigate } from "react-router";

const MonetizeTunes: React.FC<any> = ({ setShowContactPopup }) => {
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

  const openContact = () => {
    setShowContactPopup(true);
  };
  return (
    <div>
      <div className={styles.mainTune}>
        <img className={styles.dhunImage} src={dhun2} />
        <div className={styles.mainTuneText}>
          <div className={styles.text}>
            Music creation made easy for everyone
          </div>
          <button onClick={openContact} className={styles.exportbtn}>
            <span className={styles.exportbtnText}>Let's talk</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerDetails}>
          {/* <div className={styles.footerFlex}>
            <span className={styles.sitemap}>SITEMAP</span>
            <span className={styles.footerHeadmap1}>
              Product / Let's Talk /
            </span>
          </div> */}

          <div className={styles.footerFlex}>
            <span>CONTACT US</span>
            {/* <span className={styles.footerDetailsContact}>
              +1 891 989-11-91
            </span> */}
            <span className={styles.footerDetails2}>contact@dhun.ai</span>
          </div>

          <div className={styles.footerFlex}>
            {/* <span>FOLLOW US</span> */}
            {/* <span className={styles.footerDetailsContact}>Whatsapp</span>
            <span>Instagram</span> */}
          </div>
        </div>

        <div className={styles.footerHead2}>
          <div className={styles.footerContact}>
            <div className={styles.dhunContainer}>
              <img className={styles.dhunImg} src={DhunIcon} />
              <span className={styles.dhuntext}>Dhun.AI</span>
            </div>
            {/* <div className={styles.adpod}>
              <img className={styles.adpodImg} src={adpod} />
              <span className={styles.adpodText}>DHUN.AI</span>
            </div> */}
            <div className={styles.addressBar}>
              <div className={styles.address}>
                1B, RMZ Ecospace, Bellandur, Bengaluru, Karnataka 560103
              </div>
            </div>
          </div>
          <div className={styles.footerContact}>
            <button
              className={styles.arrow}
              onClick={() => window.scrollTo(0, 0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles.copyrightContent1}>
          &copy; 2023 - Copyright belong to ZEEL
        </div>
        <div className={styles.copyrightContent2}>
          <span>Privacy</span>
          <span>Legal</span>
          <span>Terms & Conditions</span>
          <span> All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

export default MonetizeTunes;
