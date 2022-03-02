import styled from "styled-components";
import Text from "../../../../Shared/Components/Text";
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Accordion from "../../../../Shared/Components/Accordion";
import { MIXIN } from "../../../../Shared/Components/Utils/Mixin";

export const StyledAccordionRoot = styled(Accordion.Root)`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const StyledAccordionHeader = styled(Accordion.Header)`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid ${COLORS.backgroundMediumGray};
  padding-bottom: 5px;
`;

export const StyledAccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 5px;
  ${MIXIN.clickable}
`;

export const StyledAccordionContent = styled(Accordion.Content)`
  margin-top: 20px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledContentTitle = styled(Text)`

`;

export const StyledContent = styled.p`

`;