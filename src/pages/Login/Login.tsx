import styles from "./Login.module.scss";
import login from "../../../public/icons/login.svg";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img src={login} alt="login" className={styles.loginImage} />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formSubContainer}>
          <div className={styles.mainHeader}>Raag.ai</div>
          <div className={styles.loginHeader}>Login</div>
          <div className={styles.inputField}>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                id="fname"
                name="fname"
                // value=""
                aria-labelledby="label-fname"
                placeholder="Enter your email"
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>Email</div>
              </label>
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                id="fname"
                name="fname"
                // value=""
                aria-labelledby="label-fname"
                placeholder="Enter your password"
              />
              <label className={styles.label} id="label-fname">
                <div className={styles.text}>Password</div>
              </label>
            </div>
          </div>

          <div className={styles.loginButton}>Login</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
