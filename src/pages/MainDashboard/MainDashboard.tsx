import styles from "./MainDashboard.module.scss";
import ResultDashboard from "../../components/resultDashboard/ResultDashboard";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    const getToken = localStorage.getItem("token");
    if(!getToken){
      navigate('/login');
    }
  },[])
  

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
