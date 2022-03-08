import styled from "styled-components";
import { COLORS } from "../Utils/Colors";

export const StyledLoader = styled.span`
  display: inline-block;
  border-width: 2px;
  border-style: solid;
  background-color: ${COLORS.backgroundLightGray};
  border-color: rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) rgb(5, 86, 222);
  border-radius: 50%;
  vertical-align: text-bottom;
  width: 60px;
  height: 60px;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 0.8s;
  animation-name: spinner-loading;
  @keyframes spinner-loading {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;

export const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 500px;
  width: 100%;
`;

export const StyledLogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 30px;
  height: 30px;
`;