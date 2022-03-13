import styled from 'styled-components';
import { COLORS } from "../Utils/Colors";
import Text from '../Text'

export const StyledTimeLineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTimeLineItemContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const StyledTimeLineBulletContainer = styled.div<{ isLast?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 48px;
  ${({ isLast }) => !isLast && 'min-height: 100px'};
`;

export const StyledTimeLineBar = styled.div`
  width: 2px;
  background-color: ${COLORS.lightGray};
  height: 100%;
`;

export const StyledBulletContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledBullet = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  color: ${COLORS.backgroundWhite};
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const StyledTimeLineItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledTimeLineItemTitle = styled(Text)`
`;