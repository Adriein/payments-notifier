import styled from 'styled-components';
import { MIXIN } from "../Utils/Mixin";

export const StyledActionIcon = styled.button<any>`
  border: 1px solid transparent;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;

  ${MIXIN.clickable};

  ${({ theme }) => theme};

  &:hover {
    ${({ hover }) => hover}
  }
`;

