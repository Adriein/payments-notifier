import React from 'react';
import {version} from '../../../package.json';
import './Copyright.css';

export default function Copyright() {
  return (
    <div className="copyright">
      <p className="subtitle copyright__text">
        {'Product made with '}
        <span role="img" aria-label="icon heart">
          ❤️
        </span>
        {' by aclaret.dev'}
        {' - '}
        {`v${version}`}
      </p>
    </div>
  );
}
