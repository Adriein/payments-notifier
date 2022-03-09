import React, { useContext, useEffect } from "react";
import {
  StyledPersonalInfoContainer,
  StyledPersonalSubscriptionInfo,
  StyledPersonalSubscriptionInfoNavigation,
  StyledProfileContainer,
  StyledSubscriptionContainer,
  StyledUserName,
  StyledUserResume,
  StyledUserResumeContainer,
} from "./Styles";

import { UserProfileProps } from "./UserProfileProps";

import { UsersContext } from "../../Context/UsersContext";
import Loader from "../../../Shared/Components/Loader";
import Avatar from "../../../Shared/Components/Avatar";
import ProfileClientInfo from "./ProfileClientInfo/ProfileClientInfo";
import Button from "../../../Shared/Components/Button";
import { FiChevronDown } from "react-icons/fi";
import ActiveSubscription from "./ActiveSubscription";
import HistorySubscription from "./SubscriptionHistory";


const Profile = ({ id }: UserProfileProps) => {
  const { state: { clientProfile, isLoading }, fetchClientProfile } = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      await fetchClientProfile({ clientId: id });
    })();
  }, []);

  return (
    <StyledProfileContainer>
      {clientProfile && !isLoading ? (
        <>
          <StyledPersonalInfoContainer>
            <StyledUserResumeContainer>
              <Avatar name={clientProfile.username} size={50}/>
              <StyledUserName>{clientProfile.username}</StyledUserName>
              {clientProfile.email}
              <StyledUserResume>

              </StyledUserResume>
            </StyledUserResumeContainer>
            <ProfileClientInfo client={clientProfile}/>
          </StyledPersonalInfoContainer>
          <StyledPersonalSubscriptionInfo>
            <StyledPersonalSubscriptionInfoNavigation>
              <Button size={'small'} variant={'fill'}>Overview</Button>
              <Button size={'small'} variant={'fill'}>Actions <FiChevronDown/></Button>
            </StyledPersonalSubscriptionInfoNavigation>
            <StyledSubscriptionContainer>
              <ActiveSubscription subscription={clientProfile.subscription[0]}/>
              <HistorySubscription inactiveSubscriptions={clientProfile.subscription}/>
            </StyledSubscriptionContainer>
          </StyledPersonalSubscriptionInfo>
        </>
      ) : <Loader logo size={80} color={"blue"}/>}
    </StyledProfileContainer>
  );
}

export default Profile;