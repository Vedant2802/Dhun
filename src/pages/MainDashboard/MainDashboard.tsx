import styles from "./MainDashboard.module.scss";
import GenerateMusic from "../../components/generateMusic/GenerateMusic";
import ResultDashboard from "../../components/resultDashboard/ResultDashboard";

const MainDashboard = () => {
  return (
    <div className={styles.mainDashboard}>
      <div className={styles.resultDashboard}>
        <ResultDashboard />
      </div>
      <div className={styles.generateMusic}>
        <GenerateMusic />
      </div>
    </div>
  );
};

export default MainDashboard;
