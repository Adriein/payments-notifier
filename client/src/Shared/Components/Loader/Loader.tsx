import React from 'react';
import {
  StyledLoader, StyledLoaderContainer, StyledLogoImg
} from './Styles';

import test from './Captura.svg'


const Loader = ({ size, color, ...others }: any) => {
  return (
    <StyledLoaderContainer>
      <StyledLoader color={color} {...others}/>
      <StyledLogoImg alt={"loading"} src={test}/>
    </StyledLoaderContainer>

  );
}

export default Loader;