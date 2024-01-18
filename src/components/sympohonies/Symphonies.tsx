import React, { useState } from "react";
import styles from "./Symphonies.module.scss";
import { contactApi } from "../../services/axiosService";

const Symphonies: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSend = async () => {
    const contactDetails = {
      name: name,
      email: email,
      phone_no: phone,
      note: note,
    };
    const data: any = await contactApi(contactDetails);
    const data2 = await data.json();
    if (data2.message) {
      setSuccess(true);
    }
  };
  return (
    <div className={styles.symphony}>
      <div>
        <p className={styles.craftText}>Connect With Us For More</p>
        <div className={styles.symphonyContainer}>
          <form
            className={styles.contactForm}
            onSubmit={() => console.log("Form Submitted")}
          >
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">
                FULL NAME
              </label>
              <input
                type="name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                EMAIL
              </label>
              <input
                type="name"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">
                PHONE
              </label>
              <input
                type="name"
                className={styles.input}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(value);
                }}
              />
            </div>
          </form>
          <form
            className={styles.contactForm}
            onSubmit={() => console.log("Form Submitted")}
          >
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="note">
                LEAVE A NOTE
              </label>
              <input
                type="name"
                className={styles.note}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </form>
          <div className={styles.submit}>
            <p className={styles.queries}>
              You can call us on +1 891 989-11-91
              <br />
              or write your queries to us at musicstudio@zee.ai
            </p>
            <button className={styles.sendButton} onClick={() => handleSend()}>
              <span className={styles.buttonText}>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symphonies;
