import styled, { css, StyledComponent } from 'styled-components';
import { MIXIN } from "../Utils/Mixin";

export const ScrollOverlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${MIXIN.scrollableY}
`;

export const ClickableOverlay: StyledComponent<"div", any, { ref: any, variant: string, }, never> = styled.div`
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
  ${(props: any) => clickOverlayStyles[props.variant]}
`;

const clickOverlayStyles: { [key: string]: any } = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `,
  aside: '',
};

export const StyledModal: StyledComponent<"div", any, { ref: any, variant: string, width: number }, never> = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  background: #fff;
  ${(props: any) => modalStyles[props.variant]}
`;

const modalStyles: { [key: string]: any } = {
  center: css`
    max-width: ${(props: any) => props.width}px;
    vertical-align: middle;
    border-radius: 3px;
    ${MIXIN.boxShadowMedium}
  `,
  aside: css`
    min-height: 100vh;
    max-width: ${(props: any) => props.width}px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  `,
};