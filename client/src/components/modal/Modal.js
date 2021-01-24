import React from 'react';
import './Modal.scss';

import { FiX, FiAlertCircle } from 'react-icons/fi';

export default function Modal({ title, warning }) {
  return (
    <div className="modal__wrapper--centered">
      <div className="modal">
        <div className="modal__header">
          <h2>{title}</h2>
          <FiX size="30px" />
        </div>
        <div className="modal__body">
          <FiAlertCircle size="90px" className="modal__warning-icon" />
          <p>{warning}</p>
        </div>
        <div className="modal__line-separator"></div>
        <div className="modal__footer">
          <div className="modal__button">Confirmar</div>
        </div>
      </div>
    </div>
  );
}
