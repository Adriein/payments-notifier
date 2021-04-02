import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { MIXIN } from '../../shared/utils/mixin';
import { COLORS } from '../../shared/utils/colors';

export const NavLeft = styled.aside`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
  width: 64px;
  background: ${COLORS.backgroundDarkPrimary};
  transition: all 0.1s;
  ${MIXIN.hardwareAccelerate}
  &:hover {
    width: 200px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
  }
`;

export const LogoLink = styled(NavLink)`
  display: block;
  position: relative;
  left: 0;
  margin: 20px 0 10px;
  transition: left 0.1s;
`;

// export const StyledLogo = styled(Logo)`
//   display: inline-block;
//   margin-left: 8px;
//   padding: 10px;
//   ${MIXIN.clickable}
// `;

export const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
`;

export const Item = styled.div`
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding-left: 64px;
  color: #deebff;
  transition: color 0.1s;
  ${MIXIN.clickable}
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  i {
    position: absolute;
    left: 18px;
  }
`;

export const ItemText = styled.div`
  position: relative;
  right: 12px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;
  font-weight: 600;
  font-size: 12px;
  ${NavLeft}:hover & {
    right: 0;
    visibility: visible;
    opacity: 1;
  }
`;
