import React from 'react';
import { LoaderProps } from "./LoaderProps";
import {
  StyledLoader, StyledLoaderContainer, StyledLogoImg
} from './Styles';

import logoLoader from './Logoloader.svg'

const Loader = ({ size, color, logo, ...others }: LoaderProps) => {
  return (
    <StyledLoaderContainer>
      <StyledLoader logo={logo} color={color} size={size} {...others}/>
      {logo && <StyledLogoImg size={size} alt={"loading"} src={logoLoader}/>}
    </StyledLoaderContainer>

  );
}

export default Loader;