import { css } from 'styled-components';

export const MIXIN = {
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  boxShadowMedium: css`
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  `,
}