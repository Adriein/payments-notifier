import React, { useState } from 'react';
import './UserForm.scss';
import { Animate } from 'react-simple-animate';

import { userFormTabs } from '../../data';

export default function UserForm() {
  const [active, setActive] = useState(0);

  const handleSelect = (index) => {
    setActive(index);
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
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
      >
        {active === 0 && (
          <div className="user-form__tab">
            <div className="user-form__input">
              <input type="text" required />
              <div className="user-form__input__underline"></div>
              <label>Nombre</label>
            </div>
            <div className="user-form__input">
              <input type="text" required />
              <div className="user-form__input__underline"></div>
              <label>Email</label>
            </div>
            <div className="user-form__input">
              <input type="text" required />
              <div className="user-form__input__underline"></div>
              <label>Tarifa</label>
            </div>
            <div className="user-form__input">
              <input type="text" required />
              <div className="user-form__input__underline"></div>
              <label>Fecha último pago</label>
            </div>
            {/* <div>Nombre</div>
            <div>Email</div>
            <div>Tarifa</div>
            <div>Fecha último pago</div> */}
          </div>
        )}
      </Animate>
    </div>
  );
}
