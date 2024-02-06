"use client";

import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useGenerateStore } from "../../stores/generateStore";
import closeicon from "../../../public/icons/close.svg";
import backArrow from "../../../public/icons/backArrow.svg";
import {
  API_STATUS_TYPES,
  AUTH_ENDPOINTS,
  REGISTER_PAGE_CONSTANTS,
} from "../../components/utilConstants/apiConstants";
import { useNavigate } from "react-router-dom";
import { getotp } from "../../services/axiosService";

const Login = () => {
  const { getUserToken } = useGenerateStore((state) => state);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [createPending, setCreatePending] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const user = useGenerateStore((state) => state.userData);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setCreatePending(true);
    if (!createPending) {
      const requestBody = {
        email: email,
      };
      await getotp({
        requestBody,
        AUTH_ENDPOINT: AUTH_ENDPOINTS.getotp,
      });
    }
    setOpenAuthModal(true);
  };

  const verifyOtp = async () => {
    const requestBody = {
      email: email,
      otp: otp,
    };
    getUserToken({
      requestBody: requestBody,
      AUTH_ENDPOINT: AUTH_ENDPOINTS.verifyOtp,
    });
  };

  const resendOtp = () => {
    const requestBody = {
      email: email,
    };
    getotp({
      requestBody,
      AUTH_ENDPOINT: AUTH_ENDPOINTS.getotp,
    });
  };

  useEffect(() => {
    if (user?.status === API_STATUS_TYPES.success) {
      setCreatePending(false);
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <div className={styles.formSubContainer}>
            <div className={styles.loginHeader}>
              {!openAuthModal
                ? REGISTER_PAGE_CONSTANTS.login
                : REGISTER_PAGE_CONSTANTS.verifyOtp}
            </div>
            <div className={styles.inputField}>
              {openAuthModal ? (
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
              ) : (
                <>
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
                </>
              )}
            </div>

            {openAuthModal ? (
              <div className={styles.resendOtp} onClick={resendOtp}>
                Resend OTP
              </div>
            ) : (
              <div className={styles.loginOTPMessage}>
                We will send an OTP on the entered Email Id
              </div>
            )}

            {openAuthModal ? (
              <div className={styles.loginButton} onClick={verifyOtp}>
                Authenticate using OTP
              </div>
            ) : (
              <div className={styles.loginButton} onClick={handleLogin}>
                Request OTP
              </div>
            )}
          </div>
          <div
            className={styles.closeIconWrapper}
            onClick={() => navigate("/")}
          >
            <img className={styles.closeIcon} src={closeicon} />
          </div>

          {openAuthModal && (
            <div
              className={styles.backArrow}
              onClick={() => setOpenAuthModal(false)}
            >
              <img className={styles.closeIcon} src={backArrow} />
            </div>
          )}
        </div>
      </div>

      {/* {openAuthModal && <OtpAuthenticate closePopup={setOpenAuthModal} />} */}
    </>
  );
};

export default Login;
