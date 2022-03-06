import styled from "styled-components";
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Separator from "../../../../Shared/Components/Separator";
import { FiMoreVertical } from "react-icons/fi";
import { MIXIN } from "../../../../Shared/Components/Utils/Mixin";

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

export const StyledDetailsContainer = styled.div`
  display: flex;
`;

export const StyledSeparator = styled(Separator)`
  background-color: ${COLORS.borderLight};
  width: 1px;
  margin: 0 8px;
`;
