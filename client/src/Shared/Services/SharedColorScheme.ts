import { COLOR } from "../Components/Utils/Colors";

export interface SharedColorScheme {
  color: keyof typeof COLOR;
  variant?: string;
}

export const getSharedColorScheme = (scheme: SharedColorScheme) => {
  const color = COLOR[scheme.color];

  if (scheme.variant === 'hover') {
    return {
      background: 'transparent',
      color: color[6],
      hover: color[0],
    }
  }

  if (scheme.variant === 'filled') {
    return {
      background: color[9],
      color: 'white',
      hover: color[7],
    }
  }

  return {
    background: color[0],
    color: color[4],
    hover: color[1],
  }
}