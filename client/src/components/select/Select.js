import React, { useEffect, useState } from 'react';
import './Select.scss';
import { FiChevronDown } from 'react-icons/fi';
import useDynamicSelect from '../../hooks/useDynamicSelect';

export default function Select({
  data,
  handleChange,
  style,
  defaultOption = undefined,
  url = undefined,
}) {
  const options = useDynamicSelect(data, url, defaultOption);
  const [selected, setSelected] = useState(options[0].label);
  const handleSelect = (index) => {
    setSelected(options[index]);
    handleChange(options[index]);
  };

  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

  return (
    <div className="dropdown" style={style}>
      <div className="dropdown-select">
        <span className="select">{selected.label}</span>
        <FiChevronDown className="dropdown-icon" />
      </div>
      <div className="dropdown-list">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-list__item"
            onClick={() => handleSelect(index)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

Select.defaultProps = {
  data: [{ value: '', label: 'Cargando...' }],
};
