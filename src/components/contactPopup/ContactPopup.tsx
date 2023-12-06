import React, { useState,useRef,useEffect } from 'react';
import styles from "./ContactPopup.module.scss";
import closeicon from "../../../public/icons/cross-circle.svg";
import check from "../../../public/icons/TickFilled.png";
import { contactApi } from '../../services/axiosService';

const ContactPopup = ({onClose}) => {

    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [number,setNumber] = useState("");
    const [note,setNote] = useState<string>("");
    const [success,setSuccess] = useState<boolean>(false);

    const handleSend = async () => {
        const contactDetails = {
            "name":name,
            "email":email,
            "phone_no": number,
            "note": note
        }
        const data: any = await contactApi(contactDetails);
        const data2 = await data.json();
        if(data2.message){
            setSuccess(true);
        }
    }

    return (<>
        <div className={styles.contactcontainer}>
            <img onClick={() => onClose()} src={closeicon} className={styles.closeIcon} />
            <div className={styles.contactHeader}>
            Connect with us for More
            </div>
            <div className={styles.inputtop}>
                <div className={styles.inputContainer}>
                    <span className={styles.inputlabel}>FULL NAME <span className={styles.astrek}>*</span></span>
                    <input onChange={(e)=> setName(e.target.value) } id="name" className={styles.inputbox} type="text" value={name}  />
                </div>
                <div className={styles.inputContainer}>
                    <span className={styles.inputlabel}>EMAIL <span className={styles.astrek}>*</span></span>
                    <input onChange={(e)=> setEmail(e.target.value) } id="email" className={styles.inputbox} type="text" value={email}  />
                </div>
                <div className={styles.inputContainer}>
                    <span className={styles.inputlabel}>PHONE</span>
                    <input onChange={(e)=> setNumber(e.target.value) } className={styles.inputbox} type="number" value={number} />
                </div>
            </div>
            <div className={styles.inputbottom}>
                <span className={styles.inputlabel}>LEAVE A NOTE</span>
                <input onChange={(e)=> setNote(e.target.value) } className={styles.inputnote} type="text" value={note} />
            </div>
            <div className={styles.footer}>
                <span className={styles.contactinfo}>You can call us on +1 891 989-11-91 <br/> 
                        or write your queries to us at hello@adpod.ai </span>
                <button onClick={() => handleSend() } className={styles.sendButton}> Send </button>
            </div>
            {success && <div className={styles.successmessage}>
             <img src={check} /> Thanks for showing interest in DhunAI. We will get in touch with you shortly!   
            </div> }
        </div>
    </>)

}

export default ContactPopup;