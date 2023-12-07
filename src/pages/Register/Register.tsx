"use client";
import React, { useEffect, useState } from "react";
import styles from "./Register.module.scss";
import login from "../../../public/icons/Register-background.png";
import { useGenerateStore } from "../../stores/generateStore";
import {
  AUTH_ENDPOINTS,
  API_STATUS_TYPES,
  REGISTER_PAGE_CONSTANTS,
} from "../../components/utilConstants/apiConstants";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { getUserToken } = useGenerateStore((state) => state);
  const user = useGenerateStore((state) => state.userData);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const registerObject = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: password,
    };
    getUserToken({
      requestBody: registerObject,
      AUTH_ENDPOINT: AUTH_ENDPOINTS.register,
    });
  };

  useEffect(() => {
    if (user?.status === API_STATUS_TYPES.success) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src={login} alt="login" className={styles.loginImage} />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formSubContainer}>
            <div className={styles.loginHeader}>
              {REGISTER_PAGE_CONSTANTS.title}
            </div>

            <div className={styles.inputField}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="name"
                  value={name}
                  placeholder={REGISTER_PAGE_CONSTANTS.usernamePlaceholder}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className={styles.label} id="label-fname">
                  <div className={styles.text}>
                    {REGISTER_PAGE_CONSTANTS.usernameLabel}
                  </div>
                </label>
              </div>

              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  placeholder={REGISTER_PAGE_CONSTANTS.emailPlaceholder}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className={styles.label} id="label-fname">
                  <div className={styles.text}>
                    {REGISTER_PAGE_CONSTANTS.emailLabel}
                  </div>
                </label>
              </div>

              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  placeholder={REGISTER_PAGE_CONSTANTS.passwordPlaceholder}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className={styles.label} id="label-fname">
                  <div className={styles.text}>
                    {REGISTER_PAGE_CONSTANTS.passwordLabel}
                  </div>
                </label>
              </div>
            </div>
            <br />
            <div className={styles.loginButton} onClick={handleSubmit}>
              {REGISTER_PAGE_CONSTANTS.buttonText}
            </div>
            <hr className={styles.thematicBreak} />
            <div className={styles.loginContain}>
              <div className={styles.loginContent}>
                {REGISTER_PAGE_CONSTANTS.existingUserText}
                <span
                  className={styles.loginLink}
                  onClick={() => navigate("/login")}
                >
                  {REGISTER_PAGE_CONSTANTS.loginLinkText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
