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
import { UsersContext } from "../../Context/UsersContext";
import ProfileClientInfo from "./ProfileClientInfo/ProfileClientInfo";
import ActiveSubscription from "./ActiveSubscription";
import HistorySubscription from "./SubscriptionHistory";

const Profile = ({ id }: UserProfileProps) => {
  const { state, fetchClientProfile } = useContext(UsersContext);

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
            <ActiveSubscription subscription={state.clientProfile.subscription[0]}/>
            <HistorySubscription inactiveSubscriptions={state.clientProfile.subscription}/>
          </StyledPersonalSubscriptionInfo>
        </>
      )}
    </StyledProfileContainer>
  );
}

export default Profile;