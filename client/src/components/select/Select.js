import React, { useEffect, useState } from 'react';
import './Select.scss';
import { FiChevronDown } from 'react-icons/fi';
import useDynamicSelect from '../../hooks/useDynamicSelect';

export default function Select({ data, handleChange }) {
  const options = useDynamicSelect(data);
  const [selected, setSelected] = useState(options[0].label);
  const handleSelect = (event) => {
    setSelected(event.currentTarget.innerHTML);
    handleChange(event);
  };

  useEffect(() => {
    setSelected(options[0].label);
  }, [options]);
  
  return (
    <div className="dropdown">
      <div className="dropdown-select">
        <span className="select">{selected}</span>
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
  data: [{ value: '', label: 'Cargando...' }],
};
