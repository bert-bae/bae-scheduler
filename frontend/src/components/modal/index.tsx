import React, { useLayoutEffect, useRef } from "react";
import "./bae-modal.scss";

const BaeModal = (props: {
  children: React.ReactNode;
  showModal: boolean;
  handleModalToggle: Function;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bodyElement = document.body;

    if (modalRef.current !== null) {
      bodyElement?.appendChild(modalRef.current);
    }
  });

  const handleModalToggle = async () => {
    await props.handleModalToggle();
  }

  return (
    <div className="bae-modal" ref={modalRef} data-display={props.showModal}>
      <div className="bae-modal-overlay"></div>
      <div
        className="bae-modal-container"
        onClick={handleModalToggle}
      >
        <div
          className="bae-modal-content"
          data-display={props.showModal}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="icon modal-close" onClick={handleModalToggle}></span>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default BaeModal;
