import React, { useContext, useEffect } from "react";
import {
  StyledProfileContainer,
} from "./Styles";

import { UserProfileProps } from "./UserProfileProps";

import { UsersContext } from "../../Context/UsersContext";
import Loader from "../../../Shared/Components/Loader";
import test from '../../../Shared/Components/Loader/Captura.png'

const Profile = ({ id }: UserProfileProps) => {
  const { state: { clientProfile, isLoading }, fetchClientProfile } = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      await fetchClientProfile({ clientId: id });
    })();
  }, []);

  return (
    <StyledProfileContainer>
      <Loader size={80} color={"blue"}/>
      {/*clientProfile && !isLoading ? (
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
       ) : (
       <StyledLoaderContainer>
       <Loader size={80} color={"blue"}>
       <StyledLogoImg src={test}/>
       </Loader>
       </StyledLoaderContainer>
       )*/}
    </StyledProfileContainer>
  );
}

export default Profile;