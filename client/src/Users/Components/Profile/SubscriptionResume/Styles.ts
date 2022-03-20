import styled from "styled-components";
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Separator from "../../../../Shared/Components/Separator";
import { MIXIN } from "../../../../Shared/Components/Utils/Mixin";
import Badge from "../../../../Shared/Components/Badge";
import DropdownMenu from "../../../../Shared/Components/DropdownMenu";
import { font } from "../../../../Shared/Components/Utils/Font";

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

export const StyledDropdownMenuTrigger = styled(DropdownMenu.Trigger)`
  all: unset;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  ${MIXIN.clickable}
  ${font.size(18)};

  &:hover {
    background-color: ${COLORS.backgroundLightGray};
  }
`;
export const StyledDropdownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: ${COLORS.backgroundWhite};
`;


export const StyledDetailsContainer = styled.div`
  display: flex;
`;

export const StyledSeparator = styled(Separator)`
  background-color: ${COLORS.borderLight};
  width: 1px;
  margin: 0 8px;
`;

export const ActiveBadge = styled(Badge)`
  background-color: #E6F8EB;
  color: #28C453;
`;

export const ExpiredBadge = styled(Badge)`
  background-color: #FCDCE1;
  color: #F24B69;
`;
