import styled, { css } from 'styled-components';

import { COLORS } from '../../utils/colors';
import { MIXIN } from '../../utils/mixin';

export const ScrollOverlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${MIXIN.scrollableY}
`;

export const ClickableOverlay = styled.div`
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
  ${props => clickOverlayStyles[props.variant]}
`;

const clickOverlayStyles = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `,
  aside: '',
};

export const StyledModal = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  background: #fff;
  ${props => modalStyles[props.variant]}
`;

const modalStyles = {
  center: css`
    max-width: ${props => props.width}px;
    vertical-align: middle;
    border-radius: 3px;
    ${MIXIN.boxShadowMedium}
  `,
  aside: css`
    min-height: 100vh;
    max-width: ${props => props.width}px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  `,
};

// export const CloseIcon = styled(Icon)`
//   position: absolute;
//   font-size: 25px;
//   color: ${color.textMedium};
//   transition: all 0.1s;
//   ${mixin.clickable}
//   ${props => closeIconStyles[props.variant]}
// `;

const closeIconStyles = {
  center: css`
    top: 10px;
    right: 12px;
    padding: 3px 5px 0px 5px;
    border-radius: 4px;
    &:hover {
      background: ${COLORS.backgroundLight};
    }
  `,
  aside: css`
    top: 10px;
    right: -30px;
    width: 50px;
    height: 50px;
    padding-top: 10px;
    border-radius: 3px;
    text-align: center;
    background: #fff;
    border: 1px solid ${COLORS.borderLightest};
    ${MIXIN.boxShadowMedium};
    &:hover {
      color: ${COLORS.primary};
    }
  `,
};