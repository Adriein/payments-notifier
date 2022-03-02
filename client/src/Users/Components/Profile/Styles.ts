import styled from 'styled-components';
import { COLORS } from "../../../Shared/Components/Utils/Colors";
import { MIXIN } from "../../../Shared/Components/Utils/Mixin";
import Form from "../../../Shared/Components/Form";

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
`;

export const StyledUserResume = styled.div``;

export const StyledEdit = styled.p`
  color: ${COLORS.primary};
  ${MIXIN.clickable}
`;

export const StyledUserProfileForm = styled(Form.Element)`
  margin-top: 30px;
`;

export const StyledFormInput = styled(Form.Field.Input)`
  margin-bottom: 10px;
`;

export const StyledFormActions = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 20px;
`;

export const StyledPersonalSubscriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 62%;
`;

export const StyledPersonalSubscriptionInfoNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  border-bottom: 2px solid ${COLORS.backgroundMediumGray};
`;