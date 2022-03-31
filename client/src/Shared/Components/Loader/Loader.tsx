import React from 'react';
import { LoaderProps } from "./LoaderProps";
import {
  StyledLoader, StyledLogoImg
} from './Styles';

import logoLoader from './Logoloader.svg'
import { getSharedColorScheme } from "../../Services/SharedColorScheme";

const Loader = ({ size, color, logo, variant, ...others }: LoaderProps) => {
  const themedStyles = getSharedColorScheme({ color, variant });
  let borderColor;

  if (variant === 'filled') {
    borderColor = `rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) ${themedStyles.background}`;
  } else {
    borderColor = `${themedStyles.color} ${themedStyles.color} ${themedStyles.color} ${themedStyles.background}`;
  }

  const styles = {
    'border-color': borderColor,
  }

  return (
    <>
      <StyledLoader logo={logo} color={color} size={size} theme={styles} {...others}/>
      {logo && <StyledLogoImg size={size} alt={"loading"} src={logoLoader}/>}
    </>

  );
}

export default Loader;