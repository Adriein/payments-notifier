import styled from 'styled-components';
import { COLORS } from "../../../Shared/Components/Utils/Colors";
import { MIXIN } from "../../../Shared/Components/Utils/Mixin";
import Form from "../../../Shared/Components/Form";
import Tabs from "../../../Shared/Components/Tabs";
import { font } from "../../../Shared/Components/Utils/Font";
import ActionIcon from "../../../Shared/Components/ActionIcon";

export const StyledProfileContainer = styled.div`
  display: flex;
`;

export const StyledUserResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledPersonalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-right: 2px solid ${COLORS.backgroundMediumGray};
  width: 38%;
`;

export const StyledUserName = styled.h1`
  margin: 20px 0 10px 0;
  position: relative;
`;

export const StyledEditIcon = styled(ActionIcon)`
  position: absolute;
  top: 6px;
  right: -50px;
`;

export const StyledEdit = styled.p`
  color: ${COLORS.primary};
  ${MIXIN.clickable}
`;

export const StyledUserProfileForm = styled(Form.Element)`
  width: 100%;
  max-width: 620px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledFormRow = styled.div<{ isLast?: boolean }>`
  display: flex;
  gap: 10px;
  ${({ isLast }) => isLast && 'flex-grow: 1'};
`;

export const StyledFormInput = styled(Form.Field.Input)`
  margin-bottom: 10px;
`;

export const StyledFormActions = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 20px;
`;

export const StyledPersonalSubscriptionInfo = styled(Tabs)`
  display: flex;
  flex-direction: column;
  width: 62%;
`;

export const StyledSubscriptionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

export const StyledTabList = styled(Tabs.List)`
  display: flex;
`;

export const StyledTabTrigger = styled(Tabs.Trigger)`
  all: unset;
  padding: 15px;
  width: 50%;
  text-align: center;
  border-bottom: 2px solid ${COLORS.backgroundMediumGray};

  ${font.size(15)}
  ${MIXIN.clickable}
  &:hover {
    color: ${COLORS.primary};
  }

  &[data-state="active"] {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
  }
`;

export const StyledTabContent = styled(Tabs.Content)`
  display: flex;
`;

export const StyledLoaderContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 500px;
  width: 100%;
`;
