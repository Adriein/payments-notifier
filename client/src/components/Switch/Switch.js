import React, { useState, useRef } from 'react';
import './switch.css';

export default function Switch({ active = false, onClick }) {
  const [isActive, setIsActive] = useState(active);
  const inputEl = useRef(null);

  const activate = () => {
    onClick();
    if (isActive) {
      inputEl.current.classList.remove('switch-item--checked');
      setIsActive(false);
      return;
    }
    setIsActive(true);
    inputEl.current.classList.add('switch-item--checked');
  };

  return (
    <div className="switch-container fade-in">
      <input
        ref={inputEl}
        type="checkbox"
        id="switch-item"
        className={isActive ? 'switch-item--checked' : ''}
      />
      <label htmlFor="switch" className="lbl" onClick={activate} />
    </div>
  );
}
