"use client";

import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import login from "../../../public/icons/Register-background.png";
import { useGenerateStore } from "../../stores/generateStore";
import {
  AUTH_ENDPOINTS,
  API_STATUS_TYPES,
  REGISTER_PAGE_CONSTANTS,
} from "../../components/utilConstants/apiConstants";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { getUserToken } = useGenerateStore((state) => state);
  const user = useGenerateStore((state) => state.userData);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const requestBody = {
      email: email,
      password: password,
    };
    getUserToken({
      requestBody,
      AUTH_ENDPOINT: AUTH_ENDPOINTS.login,
    });
  };

  useEffect(() => {
    if (user?.status === API_STATUS_TYPES.success && user?.data?.access_token) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img src={login} alt="login" className={styles.loginImage} />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formSubContainer}>
          <div className={styles.loginHeader}>
            {REGISTER_PAGE_CONSTANTS.login}
          </div>
          {/* <div className={styles.loginHeader}>Login</div> */}
          <div className={styles.inputField}>
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
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>Password</div>
              </label>
            </div>
          </div>
          <div className={styles.loginButton} onClick={handleLogin}>
            Login
          </div>
          <div className={styles.signupContainer}>
            {/* <div className={styles.signupContent}>Don’t have an account?</div> */}
            <span
              className={styles.signupLink}
              onClick={() => navigate("/register")}
            >
              Create a new account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
