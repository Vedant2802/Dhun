"use client";

import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useGenerateStore } from "../../stores/generateStore";
import closeicon from "../../../public/icons/close.svg";
import {
  AUTH_ENDPOINTS,
  API_STATUS_TYPES,
  REGISTER_PAGE_CONSTANTS,
} from "../../components/utilConstants/apiConstants";
import { useNavigate } from "react-router-dom";
import { getotp } from "../../services/axiosService";
import { createPortal } from "react-dom";
import OtpAuthenticate from "../../components/OtpAuthenticate/OtpAuthenticate";

type webmodalprops = {
  closePopup: any;
};

const Login = ({ closePopup }: webmodalprops) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [createPending, setCreatePending] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const user = useGenerateStore((state) => state.userData);
  const handleLogin = async () => {
    setCreatePending(true);
    if (!createPending) {
      const requestBody = {
        mobile: mobile,
      };
      await getotp({
        requestBody,
        AUTH_ENDPOINT: AUTH_ENDPOINTS.getotp,
      });
    }
    setOpenAuthModal(true);
  };

  useEffect(() => {
    if (openAuthModal) {
      createPortal(
        <OtpAuthenticate closePopup={setOpenAuthModal} />,
        document.body
      );
    }
  }, [openAuthModal]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formSubContainer}>
          <div className={styles.loginHeader}>
            {REGISTER_PAGE_CONSTANTS.login}
          </div>
          <div className={styles.inputField}>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>Name</div>
              </label>
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>Email</div>
              </label>
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>+91</div>
              </label>
              <input
                className={styles.inputMobile}
                type="mobile"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 10);
                  setMobile(value);
                }}
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>Mobile Number</div>
              </label>
            </div>
          </div>
          <div className={styles.loginOTPMessage}>
            We will send an OTP on the entered mobile number
          </div>
          <div className={styles.loginButton} onClick={handleLogin}>
            Request OTP
          </div>
        </div>
        <div className={styles.closeIconWrapper}>
          <img
            className={styles.closeIcon}
            src={closeicon}
            onClick={() => closePopup(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
