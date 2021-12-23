import styled from 'styled-components';
import { MIXIN } from '../../utils/mixin';



export const StyledTooltip = styled.div`
  z-index: 20;
  position: fixed;
  width: ${props => props.width}px;
  border-radius: 3px;
  background: #fff;
  ${MIXIN.hardwareAccelerate}
  ${MIXIN.boxShadowDropdown}
`;