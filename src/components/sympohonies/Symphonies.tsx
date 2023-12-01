import * as React from "react";
import styles from './Symphonies.module.scss';
import Ellipse from "../../../public/icons/who1.svg";
import Ellipse2 from "../../../public/icons/who3.svg";
import Ellipse3 from "../../../public/icons/who4.svg";
import Ellipse4 from "../../../public/icons/who2.png"; 

const Symphonies = () => {

    return (<div className={styles.symphonyContainer}>
    <p className={styles.craftText}>Music Creation Made Easy for Everyone!</p>
    <span className={styles.symphonyText}>Compose anytime, anywhere. </span>
    <div className={styles.options}>
        <img className={styles.production} src={Ellipse4} />
        <img className={styles.adOption} src={Ellipse2} />
        <img className={styles.contentCreators} src={Ellipse3} />
        <img className={styles.singers} src={Ellipse} />
    </div>
    </div>)
}

export default Symphonies;