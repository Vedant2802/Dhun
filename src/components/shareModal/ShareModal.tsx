import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  InstapaperIcon,
  EmailIcon,
  WhatsappIcon,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
} from "react-share";

import copyIcon from "../../../public/icons/copyIcon.svg";
import close from "../../../public/icons/closeSocial.svg";

import styles from "./ShareModal.module.scss";

type ShareModalProps = {
  shareURL: string;
  showShareModal: any;
  shareModal: any;
};

const ShareModal = (props: ShareModalProps) => {
  const { shareURL, showShareModal } = props;
  console.log("shareURL", shareURL);

  const copyToClipBoard = (url: string) => {
    navigator.clipboard.writeText(url);
    console.log("copymsg", navigator.clipboard.writeText(url));
  };

  const closeIcon = () => {
    showShareModal(false);
  };

  return (
    <div className={styles.shareModal}>
      <div className={styles.closeModal}>
        <img src={close} alt="closeIcon" onClick={closeIcon} />
      </div>
      <div
        onClick={() => copyToClipBoard(shareURL)}
        className={styles.copylink}
      >
        <div> dhun link</div>
        <img src={copyIcon} alt="copyIcon" className={styles.copyIcon} />
      </div>
      <div className={styles.shareModalContainer}>
        <FacebookShareButton
          url={shareURL}
          title="Facebook"
          className={styles.shareButton}
        >
          <FacebookIcon size={40} />
          <div className={styles.socialName}>Facebook</div>
        </FacebookShareButton>

        <EmailShareButton
          url={shareURL}
          body="body"
          className={styles.shareButton}
        >
          <EmailIcon size={40} />
          <div className={styles.socialName}>Email</div>
        </EmailShareButton>

        <WhatsappShareButton url={shareURL} className={styles.shareButton}>
          <WhatsappIcon size={40} />
          <div className={styles.socialName}>Whatsapp</div>
        </WhatsappShareButton>

        {/* <InstapaperShareButton url={shareURL}>
          <InstapaperIcon size={40} />
          <div>Instagram</div>
        </InstapaperShareButton> */}

        <LinkedinShareButton url={shareURL} className={styles.shareButton}>
          <LinkedinIcon size={40} />
          <div className={styles.socialName}>LinkedIn</div>
        </LinkedinShareButton>

        <TwitterShareButton url={shareURL} className={styles.shareButton}>
          <XIcon size={40} />
          <div className={styles.socialName}>Twitter</div>
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareModal;
