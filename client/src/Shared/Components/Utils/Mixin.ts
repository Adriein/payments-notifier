import { css } from 'styled-components';

export const MIXIN = {
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,

  disabled: css`
    cursor: not-allowed;
    pointer-events: none;
  `,

  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  boxShadowMedium: css`
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  `,
  boxShadowDropdown: css`
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px;
  `,
}