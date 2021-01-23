import React from 'react';

import './ActionButton.scss';

export default function ActionButton({ children, className = undefined }) {
  return <div className={className? className : "button--action"}>{children}</div>;
}
