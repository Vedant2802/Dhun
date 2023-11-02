import ResultDashboard from "../resultDashboard/ResultDashboard";
import GenerateMusic from "../generateMusic/GenerateMusic";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <>
      <div className={styles.mainDashboard}>
        <div className={styles.resultDashboard}>
          <ResultDashboard />
        </div>
        <div className={styles.generateMusic}>
          <GenerateMusic />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
