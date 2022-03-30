import styled from 'styled-components';
import { MIXIN } from "../Utils/Mixin";

export const ButtonBase = styled.button<any>`
  border: 1px solid transparent;
  display: inline-flex;
  width: auto;
  line-height: 1;
  user-select: none;
  appearance: none;
  box-sizing: inherit;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme};

  &:hover {
    ${({ hover }) => hover}
  }

  &:disabled {
    ${({ hover }) => hover};
    ${MIXIN.disabled};
  }

  ${MIXIN.clickable};
`;