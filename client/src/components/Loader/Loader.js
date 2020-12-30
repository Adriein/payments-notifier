//https://github.com/mhnpd/react-loader-spinner/tree/master/src
import React, { useState, useEffect } from 'react';
import {Triangle} from './Triangle/Triangle';

export default function Loader(props) {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    let timer;
    if (props.timeout && props.timeout > 0) {
      timer = setTimeout(() => {
        setDisplay(false);
      }, props.timeout);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  if (!props.visible || props.visible === 'false') {
    return null;
  }
  return display ? (
    <div aria-busy="true" className={props.className} style={props.style}>
      {React.createElement(Triangle, { ...props })}
    </div>
  ) : null;
}

Loader.defaultProps = {
  className: '',
  visible: true,
  timeout: 0,
};
