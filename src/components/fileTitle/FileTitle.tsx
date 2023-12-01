import React, { useEffect, useState } from "react";
import { useGenerateStore } from "../../stores/generateStore";
import styles from "./FileTitle.module.scss";
const FileTitle = () => {
  const fileName = useGenerateStore((state) => state.fileName);
  const [fileTitle, setFileTitle] = useState(fileName);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setFileTitle(value);
  };

  useEffect(() => {
    setFileTitle(fileName);
  }, [fileName]);
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
