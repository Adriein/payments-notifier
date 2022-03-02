import React, { useContext, useEffect } from "react";
import {
  StyledPersonalInfoContainer,
  StyledProfileContainer,
  StyledUserName,
  StyledUserResume,
  StyledUserResumeContainer,
  StyledPersonalSubscriptionInfo,
  StyledPersonalSubscriptionInfoNavigation
} from "./Styles";

import { FiChevronDown } from "react-icons/fi";
import Avatar from "../../../Shared/Components/Avatar";
import { UserProfileProps } from "./UserProfileProps";
import Button from "../../../Shared/Components/Button";
import { useTranslation } from "react-i18next";
import { useToggle } from "../../../Shared/Hooks/useToggle";
import { UsersContext } from "../../Context/UsersContext";
import ProfileClientInfo from "./ProfileClientInfo/ProfileClientInfo";

const Profile = ({ id }: UserProfileProps) => {
  const { state, fetchClientProfile } = useContext(UsersContext);
  const { t } = useTranslation('profile');
  const [ edit, toggleEdit ] = useToggle();

  useEffect(() => {
    (async () => {
      await fetchClientProfile({ clientId: id });
    })();
  }, []);

  return (
    <StyledProfileContainer>
      {state.clientProfile && (
        <>
          <StyledPersonalInfoContainer>
            <StyledUserResumeContainer>
              <Avatar name={state.clientProfile.username} size={50}/>
              <StyledUserName>{state.clientProfile.username}</StyledUserName>
              {state.clientProfile.email}
              <StyledUserResume>

              </StyledUserResume>
            </StyledUserResumeContainer>
            <ProfileClientInfo client={state.clientProfile}/>
          </StyledPersonalInfoContainer>
          <StyledPersonalSubscriptionInfo>
            <StyledPersonalSubscriptionInfoNavigation>
              <Button size={'small'} variant={'fill'}>Overview</Button>
              <Button size={'small'} variant={'fill'}>Actions <FiChevronDown/></Button>
            </StyledPersonalSubscriptionInfoNavigation>
          </StyledPersonalSubscriptionInfo>
        </>
      )}
    </StyledProfileContainer>
  );
}

export default Profile;