import React, { useCallback, useEffect, useRef, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/all";
import { ScrollOverlay, ClickableOverlay, StyledModal } from './Styles';

const Modal = ({
  className,
  variant,
  width,
  withCloseIcon,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderContent,
}: any) => {
  const [ stateIsOpen, setStateOpen ] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const modalRef = useRef();
  const clickableOverlayRef = useRef();

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [ isControlled, tellParentToClose ]);

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
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
      ReactDOM.createPortal(
        <ScrollOverlay>
          <ClickableOverlay variant={variant} ref={clickableOverlayRef}>
            <StyledModal
              className={className}
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