import React, { useCallback, useEffect, useRef, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { ScrollOverlay, ClickableOverlay, StyledModal } from './Styles';
import useOnEscapeKeyDown from "../../Hooks/useOnEscapeKeyDown";
import useOnOutsideClick from "../../Hooks/useOnOutsideClick";
import { ModalProps } from "./ModalProps";

const Modal = ({
  variant,
  width,
  withCloseIcon,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderContent,
}: ModalProps) => {
  const [ stateIsOpen, setStateOpen ] = useState(false);
  const isOpen = propsIsOpen ? propsIsOpen : stateIsOpen;

  const modalRef = useRef();
  const clickableOverlayRef = useRef();

  const closeModal = useCallback(() => {
    if (!propsIsOpen) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [ propsIsOpen, tellParentToClose ]);

  useOnOutsideClick(modalRef, isOpen, closeModal, clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [ isOpen ]);

  return (
    <Fragment>
      {!propsIsOpen && renderLink!({ open: () => setStateOpen(true) })}

      {isOpen &&
      ReactDOM.createPortal(
        <ScrollOverlay>
          <ClickableOverlay variant={variant} ref={clickableOverlayRef}>
            <StyledModal
              variant={variant}
              width={width}
              ref={modalRef}
            >
              {withCloseIcon && <FiX onClick={closeModal}/>}
              {renderContent({ close: closeModal })}
            </StyledModal>
          </ClickableOverlay>
        </ScrollOverlay>,
        root!
      )}
    </Fragment>
  );
};

const root = document.getElementById('root');

export default Modal;