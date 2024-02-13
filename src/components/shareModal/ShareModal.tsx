import React, { useState } from "react";
import {
  //   FacebookShareButton,
  //   TwitterShareButton,
  //   EmailShareButton,
  WhatsappShareButton,
} from "react-share";

type ShareModalProps = {
  //   isOpen: boolean;
  //   handleClose: () => void;
  //   isSportsLiveEvent: boolean;
  shareURL: string;
  //   toastMsgHandler: () => void;
};

const ShareModal = (props: ShareModalProps) => {
  const { shareURL } = props;
  console.log("shareURL", shareURL);
  const trackSocialMediaSharingMixpanelEvent = (platformName: string) => {
    // handleClose();
  };

  const copyToClipBoard = (url: string) => {
    navigator.clipboard.writeText(url);
    console.log("copymsg", navigator.clipboard.writeText(url));
    // toastMsgHandler();
  };

  return (
    <div
      data-testid="share-model-container"

      //   ref={wrapperRef}
    >
      <div>
        <div
          data-testid="share-modal-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <FacebookShareButton
            title="Facebook"
            url={shareURL}
          ></FacebookShareButton>

          <TwitterShareButton
            title="twitter"
            url={shareURL}
          ></TwitterShareButton>

          <EmailShareButton
            url={shareURL}
            subject="email"
            body="Check out this content"
          ></EmailShareButton> */}

          {window.innerWidth <= 600 ? (
            <WhatsappShareButton
              title="whatsapp"
              url={shareURL}
              children={undefined}
            ></WhatsappShareButton>
          ) : null}
          <div
            data-testid="copy-link"
            onClick={() => copyToClipBoard(shareURL)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
