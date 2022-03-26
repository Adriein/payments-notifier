import { ForwardedRef, forwardRef } from "react";
import { ActionIconProps } from "./ActionIconProps";
import { StyledActionIcon } from "./Styles";
import { getSharedColorScheme } from "../../Services/SharedColorScheme";

const SIZE = {
  xs: {
    'font-size': '12px',
    'min-height': '18px',
    'height': '18px',
    'min-width': '18px',
    'width': '18px',
  },
  sm: {
    'font-size': '14px',
    'min-height': '22px',
    'height': '22px',
    'min-width': '22px',
    'width': '22px',
  },
  md: {
    'font-size': '18px',
    'min-height': '28px',
    'height': '28px',
    'min-width': '28px',
    'width': '28px',
  },
  lg: {
    'font-size': '26px',
    'min-height': '34px',
    'height': '34px',
    'min-width': '34px',
    'width': '34px',
  },
  xl: {
    'font-size': '34px',
    'min-height': '44px',
    'height': '44px',
    'min-width': '44px',
    'width': '44px',
  }
};

const RADIUS = {
  xs: {
    'border-radius': '2px'
  },
  sm: {
    'border-radius': '4px'
  },
  md: {
    'border-radius': '8px'
  },
  lg: {
    'border-radius': '16px'
  },
  xl: {
    'border-radius': '32px'
  }
}


const ActionIcon = forwardRef((
  { children, isLoading, onClick, size, color, radius, variant, ...otherProps }: ActionIconProps,
  ref: ForwardedRef<ActionIconProps>
) => {

  const themedStyles = getSharedColorScheme({ color, variant })

  const styles = {
    ...SIZE[size],
    ...RADIUS[radius],
    'background-color': themedStyles.background,
    'color': themedStyles.color,
  };

  const hover = {
    'background-color': themedStyles.hover
  }

  return (
    <StyledActionIcon ref={ref} onClick={onClick} theme={styles} hover={hover} {...otherProps}>
      {isLoading ? 'loading' : children}
    </StyledActionIcon>
  );
});


export default ActionIcon;