import React, { useState, useContext } from 'react';
import './UserForm.scss';
import { Animate } from 'react-simple-animate';

import { userFormTabs } from '../../data';
import useInputState from '../../hooks/useInputState';
import { FiCheckCircle, FiHome } from 'react-icons/fi';
import { Context as UsersContext } from '../../context/UsersContext';

export default function UserForm() {
  const { create } = useContext(UsersContext);
  const [active, setActive] = useState(0);
  const [form, handleChange, reset] = useInputState({
    username: '',
    email: '',
    pricing: '',
    lastPaymentDate: '',
  });

  const handleSelect = (index) => {
    setActive(0);
  };

  const handleCreate = () => {
    create({ status: 'save', data: form });
    reset();
  };

  const handleBack = () => {
    reset();
    create({ status: 'cancel' });
  };

  return (
    <div className="user-form__container">
      <ul className="user-form__navigator">
        {userFormTabs.map((tab, index) => {
          return (
            <li
              onClick={() => handleSelect(index)}
              key={index}
              className={index === active ? 'user-form__tab--active' : ''}
            >
              <div className="user-form__navigator__tab">
                <span>{tab.title}</span>
                {tab.icon}
              </div>
            </li>
          );
        })}
      </ul>
      <Animate
        play={active === 0 ? true : false}
        start={{ transform: 'translateX(-50%)' }}
        end={{ transform: 'translateX(0)' }}
      >
        {active === 0 && (
          <div className="user-form__tab">
            <div className="user-form__input">
              <input
                type="text"
                required
                name="username"
                onChange={handleChange}
                value={form.username}
              />
              <div className="user-form__input__underline"></div>
              <label>Nombre</label>
            </div>
            <div className="user-form__input">
              <input
                type="text"
                required
                name="email"
                onChange={handleChange}
                value={form.email}
              />
              <div className="user-form__input__underline"></div>
              <label>Email</label>
            </div>
            <div className="user-form__input">
              <input
                type="text"
                required
                name="pricing"
                onChange={handleChange}
                value={form.pricing}
              />
              <div className="user-form__input__underline"></div>
              <label>Tarifa (mensual - trimestral)</label>
            </div>
            <div className="user-form__input">
              <input
                type="text"
                required
                name="lastPaymentDate"
                onChange={handleChange}
                value={form.lastPaymentDate}
              />
              <div className="user-form__input__underline"></div>
              <label>Fecha último pago (dd/mm/aaaa)</label>
            </div>
            <div className="user-form__action-buttons">
              <div className="user-form__button" onClick={handleCreate}>
                <span>Crear</span>
                <FiCheckCircle size="24px" />
              </div>
              <div className="user-form__button" onClick={handleBack}>
                <span>Atras</span>
                <FiHome size="24px" />
              </div>
            </div>
          </div>
        )}
      </Animate>
    </div>
  );
}
