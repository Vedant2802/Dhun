import * as React from "react";
import styles from "./homeHeader.module.scss";
import DhunIcon from "../../../public/icons/Layer_1.svg";
import { MENUITEMS } from "../../utils/genAiConstant";

const HomeHeader = () => {


    return (
        <>
        <div className={styles.header}>
            <div className={styles.dhunContainer}>
                <img src={DhunIcon} />
                <span className={styles.dhuntext}>DHUN.AI</span>
            </div>
            <div className={styles.menu}>
                    {MENUITEMS.map((item,index) => (
                        <div className={styles.menuItems} id={String(index)}>{item}</div>
                    ))}
                    <div className={styles.login}>
                        Login/Register
                    </div>
            </div>
        </div>
        </>
    )

}

export default  HomeHeader;