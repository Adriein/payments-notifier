import styled from "styled-components";
import Text from "../../../../Shared/Components/Text";
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Separator from "../../../../Shared/Components/Separator";
import ScrollArea from "../../../../Shared/Components/ScrollArea";
import { FiMoreVertical } from "react-icons/fi";
import { MIXIN } from "../../../../Shared/Components/Utils/Mixin";

export const StyledSubscriptionInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const StyledActiveSubscription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 2px solid ${COLORS.backgroundMediumGray};
  padding: 8px;
  border-radius: 10px;
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const StyledOptionsIcon = styled(FiMoreVertical)`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  ${MIXIN.clickable}
`;

export const StyledSubscriptionTitle = styled(Text)`

`;

export const StyledDetailsContainer = styled.div`
  display: flex;
`;

export const StyledSeparator = styled(Separator)`
  background-color: ${COLORS.borderLight};
  width: 1px;
  margin: 0 8px;
`;

export const StyledScrollArea = styled(ScrollArea)`
  width: 100%;
  height: 30px;
  overflow: hidden;
  border-radius: 4px;
`;

export const StyledViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const StyledScrollBar = styled(ScrollArea.Scrollbar)`
  display: flex;
  padding: 2px;
  background: #e4e4e4;

  &:hover {
    background: #C7C7C7;
  }

  &[data-orientation="vertical"] {
    width: 10px;
  }

`;

export const StyledThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  background-color: #86848D;
  position: relative;
  border-radius: 10px;
`;

export const StyledScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
