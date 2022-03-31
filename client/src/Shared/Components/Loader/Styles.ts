import styled from "styled-components";
import { COLORS } from "../Utils/Colors";

export const StyledLoader = styled.span<any>`
  display: inline-block;
  border-width: 2px;
  border-style: solid;
  ${(props) => props.logo && `background-color: ${COLORS.backgroundLightGray}`};
  border-radius: 50%;
  vertical-align: text-bottom;
  width: ${({ size }) => size ?? 60}px;
  height: ${({ size }) => size ?? 60}px;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 0.8s;
  animation-name: spinner-loading;

  ${({ theme }) => theme};

  @keyframes spinner-loading {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;

export const StyledLogoImg = styled.img<any>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: ${({ size }) => size ? size / 2 : 30}px;
  height: ${({ size }) => size ? size / 2 : 30}px;
`;