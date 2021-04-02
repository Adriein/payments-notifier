import styled from 'styled-components';
import { COLORS } from '../../shared/utils/colors';
import { MIXIN } from '../../shared/utils/mixin';

export const StyledHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 60px;
  width: 100%;
  padding: 0 40px 0 104px;
  background-color: ${COLORS.backgroundWhite};
  justify-content: space-between;
  white-space: nowrap;
  align-items: center;
  font-size: 14px;
`;

export const Version = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  padding-right: 8px;
  border-right: 2px solid #d6d6db;
  height: 30px;
  font-weight: 500;
`;

export const MenuItem = styled.span`
  ${MIXIN.clickable}
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: ${COLORS.primary};
  }
`;

export const Menu = styled.div`
  display: flex;
  ${MenuItem}:not(:first-child) {
    margin-left: 30px;
  }
  ${MenuItem}:first-child {
    color: ${COLORS.primary};
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  font-weight: 500;
  margin-left: 10px;
`;
