import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function Login() {
  return (
    <form action="#" class="center">
      <div className="register">
        <FiArrowRight className="next" />
        <div className="inputContainer">
          <input className="inputField" required autofocus />
          <label className="inputLabel">usuario...</label>
          <div className="inputProgress"></div>
        </div>
      </div>
    </form>
  );
}
