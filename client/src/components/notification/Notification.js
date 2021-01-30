import React, { useEffect } from 'react';
import './Notification.scss';

import { FiX } from 'react-icons/fi';

export default function Notification({ index, icon, message, type, handleClose }) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      handleClose(index);
    }, 4000);
    return () => timerId && clearTimeout(timerId);
  });
  return (
    <div className={`notification__container notification__container--${type}`}>
      <div
        className={
          icon.props.className
            ? icon.props.className
            : `notification__icon ${type}`
        }
      >
        {icon}
      </div>
      <span className="notification__message">{message}</span>
      <div className={`notification__button notification__button--${type}`}>
        <FiX size="30px" onClick={handleClose} />
      </div>
    </div>
  );
}
