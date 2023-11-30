import React, { useState } from "react";
import styles from "./FileTitle.module.scss";
const FileTitle = () => {
  const [fileTitle, setFileTitle] = useState("Untitled file");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setFileTitle(value);
  };
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        name="fileTitle"
        value={fileTitle}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default FileTitle;
