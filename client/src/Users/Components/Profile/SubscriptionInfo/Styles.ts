import styled from "styled-components";
import Text from "../../../../Shared/Components/Text";
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Separator from "../../../../Shared/Components/Separator";

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
  gap: 10px;
`;

export const StyledSubscriptionTitle = styled(Text)`

`;

export const StyledDetailsContainer = styled.div`
  display: flex;
`;

export const StyledSeparator = styled(Separator)`
  background-color: ${COLORS.borderLight};
  width: 1px;
  margin: 0 5px;
`;
