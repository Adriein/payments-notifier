import React, { useState } from 'react';
import './Select.scss';
import { FiChevronDown } from 'react-icons/fi';

export default function Select({ title, options, handleChange }) {
  const [selected, setSelected] = useState(undefined);
  const handleSelect = (event) => {
    setSelected(event.currentTarget.innerHTML);
    handleChange(event);
  };
  return (
    <div className="dropdown">
      <div className="dropdown-select">
        <span className="select">{selected ? selected : title}</span>
        <FiChevronDown className="dropdown-icon" />
      </div>
      <div className="dropdown-list">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-list__item"
            onClick={handleSelect}
            data-value={option.value}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

Select.defaultProps = {
  title: '',
  options: [{ value: '', label: '' }],
};
