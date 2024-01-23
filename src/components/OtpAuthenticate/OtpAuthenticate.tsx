import React, { useState } from "react";
import styles from "./OtpAuthenticate.module.scss";
import { REGISTER_PAGE_CONSTANTS } from "../utilConstants/apiConstants";
import closeicon from "../../../public/icons/close.svg";

type webmodalprops = {
  closePopup: Function;
};

const OtpAuthenticate = ({ closePopup }: webmodalprops) => {
  const [otp, setOtp] = useState<string>("");

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
                type="otp"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 6);
                  setOtp(value);
                }}
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>OTP</div>
              </label>
            </div>
          </div>
          <div className={styles.loginOTPMessage}>
            We have sent a 6 digit OTP to your registered mobile number
          </div>
          <div
            className={styles.loginButton}
            onClick={() => alert("otp entered")}
          >
            Authenticat using OTP
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

export default OtpAuthenticate;
