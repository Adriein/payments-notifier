import styled, { keyframes } from 'styled-components';
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { COLOR, COLORS } from "../Utils/Colors";
import { MIXIN } from "../Utils/Mixin";
import { font } from "../Utils/Font";

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const StyledDropDownContent = styled(RadixDropdownMenu.Content)`
  min-width: 220px;
  background-color: ${COLORS.backgroundWhite};
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: forwards;
  will-change: transform, opacity;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &[data-state="open"] {
    &[data-side="top"] {
      animation-name: ${slideDownAndFade}
    }


    &[data-side="right"] {
      animation-name: ${slideLeftAndFade}
    }


    &[data-side="bottom"] {
      animation-name: ${slideUpAndFade}
    }


    &[data-side="left"] {
      animation-name: ${slideRightAndFade}
    }

  }
`;

export const StyledDropDownItem = styled(RadixDropdownMenu.Item)`
  all: unset;
  color: ${COLORS.black};
  border-radius: 3px;
  display: flex;
  align-items: center;
  align-content: center;
  gap: 10px;
  height: 25px;
  padding: 0 5px;
  position: relative;
  color: ${COLORS.primary};
  ${font.medium};

  &:hover {
    background-color: ${COLORS.primary};
    color: ${COLORS.backgroundWhite}
  }

  &[data-disabled] {
    color: ${COLORS.gray};
    pointer-events: none;
  }

  ${MIXIN.clickable};
`;

export const StyledDropdownSeparator = styled(RadixDropdownMenu.Separator)`
  height: 1px;
  background-color: ${COLORS.primaryLight3};
`;