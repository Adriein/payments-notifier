import React from 'react';
import './Notification.scss';

import { FiX } from 'react-icons/fi';

export default function Notification({ icon, message, type, handleClose }) {
  return (
    <div className="notification__container">
      <div
        className={
          icon.props.className
            ? icon.props.className
            : `notification__icon--${type}`
        }
      >
        {icon}
      </div>
      <span className="notification__message">{message}</span>
      <div className="notification__button">
        <FiX size="30px" onClick={handleClose} />
      </div>
    </div>
  );
}
