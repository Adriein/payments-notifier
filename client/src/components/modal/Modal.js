import React from 'react';
import './Modal.scss';

import { FiX } from 'react-icons/fi';

export default function Modal({
  title,
  message,
  icon,
  type,
  handleClose,
  callback,
}) {
  const handleConfirm = () => {
    if (Array.isArray(callback)) {
      callback.forEach((cb) => cb());
      handleClose();
      return;
    }
    callback();
    handleClose();
  };
  return (
    <div className="modal__wrapper--centered">
      <div className="modal">
        <div className={`modal__header modal__header--${type}`}>
          <h3>{title}</h3>
          <FiX size="30px" onClick={handleClose} />
        </div>
        <div className="modal__body">
          <div
            className={
              icon.props.className
                ? icon.props.className
                : `modal__icon--${type}`
            }
          >
            {icon}
          </div>
          <p>{message}</p>
        </div>
        <div className="modal__line-separator"></div>
        <div className="modal__footer">
          <div
            className={`modal__button modal__button--${type}`}
            onClick={handleConfirm}
          >
            Confirmar
          </div>
        </div>
      </div>
    </div>
  );
}
