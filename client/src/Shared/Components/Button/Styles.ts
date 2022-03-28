import styled from 'styled-components';
import { MIXIN } from "../Utils/Mixin";

export const ButtonBase = styled.button<any>`
  border: 1px solid transparent;
  display: inline-block;
  width: auto;
  line-height: 1;
  user-select: none;
  appearance: none;
  box-sizing: inherit;
  font-weight: 600;

  ${({ theme }) => theme};

  &:hover {
    ${({ hover }) => hover}
  }

  ${MIXIN.clickable};
`;