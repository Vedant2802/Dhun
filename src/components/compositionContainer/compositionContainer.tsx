import * as React from "react";
import styles from "./compositionContainer.module.scss";
import kebab from "../../../public/icons/KebabMenu-Vertical.svg";
import playcircle from "../../../public/icons/play_circle_filled.svg";

const compositionContainer = () => {

    return (<>
    <div className={styles.compositionContainer}>
                <div className={styles.composition}>
                    <div className={styles.playButtonContainer}>
                      <img src={playcircle} />
                      <span className={styles.compositionText}>Composition 1</span>
                    </div>
                    <img src={kebab} />
                </div>
                <div className={styles.composition}>
                    <div className={styles.playButtonContainer}>
                      <img src={playcircle} />
                      <span className={styles.compositionText}>Composition 2</span>
                    </div>
                    <img src={kebab} />
                </div>
                <div className={styles.composition}>
                    <div className={styles.playButtonContainer}>
                      <img src={playcircle} />
                      <span className={styles.compositionText}>Composition 3</span>
                    </div>
                    <img src={kebab} />
                </div>
            </div>
    </>)

}


export default compositionContainer;