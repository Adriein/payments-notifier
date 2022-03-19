import styled from 'styled-components';
import * as RadixSwitch from '@radix-ui/react-switch';
import { COLORS } from "../Utils/Colors";
import { MIXIN } from "../Utils/Mixin";

export const StyledSwitch = styled(RadixSwitch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: ${COLORS.black};
  position: relative;
  border-radius: 20px;
  box-shadow: 0 0 0 2px ${COLORS.black};

  &:focus {
    box-shadow: 0 0 0 2px ${COLORS.black};
  }

  &[data-state="checked"] {
    background-color: ${COLORS.black};
  }

  ${MIXIN.clickable};
`;

export const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${COLORS.backgroundWhite};
  border-radius: 20px;
  box-shadow: 0 2px 2px ${COLORS.black};
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;