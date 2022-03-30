import React from 'react';
import { LoaderProps } from "./LoaderProps";
import {
  StyledLoader, StyledLogoImg
} from './Styles';

import logoLoader from './Logoloader.svg'
import { getSharedColorScheme } from "../../Services/SharedColorScheme";

const Loader = ({ size, color, logo, ...others }: LoaderProps) => {
  const themedStyles = getSharedColorScheme({ color });

  const styles = {
    'border-color': `${themedStyles.color} ${themedStyles.color} ${themedStyles.color} ${themedStyles.background}`,
  }

  return (
    <>
      <StyledLoader logo={logo} color={color} size={size} theme={styles} {...others}/>
      {logo && <StyledLogoImg size={size} alt={"loading"} src={logoLoader}/>}
    </>

  );
}

export default Loader;