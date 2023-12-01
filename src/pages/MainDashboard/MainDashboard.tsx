import styles from "./MainDashboard.module.scss";
import ResultDashboard from "../../components/resultDashboard/ResultDashboard";
import React from "react";

const MainDashboard = () => {
  return (
    <div className={styles.dashBoardContainer}>
      <div className={styles.mainDashboard}>
        <div className={styles.resultDashboard}>
          <ResultDashboard />
        </div>
        {/* <div className={styles.generateMusic}>
          <GenerateMusic />
        </div> */}
      </div>
      {/* <div className={styles.resultControl}>Generate result</div> */}
    </div>
  );
};

export default MainDashboard;
