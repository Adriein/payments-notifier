import React from 'react';
import './Select.scss';
import { FiChevronDown } from 'react-icons/fi';

export default function Select({ title, options }) {
  return (
    <div className="dropdown">
      <div className="dropdown-select">
        <span className="select">{title}</span>
        <FiChevronDown className="dropdown-icon"/>
      </div>
      <div className="dropdown-list">
        {options.map((option, index) => (
          <div key={index} className="dropdown-list__item">{option.label}</div>
        ))}
      </div>
    </div>
  );
}

Select.defaultProps = {
  title: '',
  options: [{ value: '', label: '' }],
};
