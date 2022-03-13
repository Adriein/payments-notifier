import React, { useContext, useEffect } from "react";
import {
  StyledPersonalInfoContainer,
  StyledPersonalSubscriptionInfo,
  StyledPersonalSubscriptionInfoNavigation,
  StyledProfileContainer,
  StyledSubscriptionContainer, StyledTabContent, StyledTabList, StyledTabTrigger,
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
import Tabs from "../../../Shared/Components/Tabs";
import EventList from "./Events";


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
          <StyledPersonalSubscriptionInfo defaultValue={"tab1"}>
            <StyledTabList>
              <StyledTabTrigger value={"tab1"}>Overview</StyledTabTrigger>
              <StyledTabTrigger value={"tab2"}>Events</StyledTabTrigger>
            </StyledTabList>
            <StyledTabContent value={"tab1"}>
              <StyledSubscriptionContainer>
                <ActiveSubscription subscription={clientProfile.subscription[0]}/>
                <HistorySubscription inactiveSubscriptions={clientProfile.subscription}/>
              </StyledSubscriptionContainer>
            </StyledTabContent>
            <StyledTabContent value={"tab2"}>
              <EventList list={clientProfile.subscription}/>
            </StyledTabContent>
          </StyledPersonalSubscriptionInfo>
        </>
      ) : <Loader logo size={80} color={"blue"}/>}
    </StyledProfileContainer>
  );
}

export default Profile;

/*<StyledPersonalSubscriptionInfoNavigation>
 <Button size={'small'} variant={'fill'}>Overview</Button>
 <Button size={'small'} variant={'fill'}>Actions <FiChevronDown/></Button>
 </StyledPersonalSubscriptionInfoNavigation>*/

/*
 * <Tabs defaultValue={"tab1"}>
 <StyledTabList>
 <StyledTabTrigger value={"tab1"}>Overview</StyledTabTrigger>
 <StyledTabTrigger value={"tab2"}>Events</StyledTabTrigger>
 </StyledTabList>
 <Tabs.Content value={"tab1"}>
 <StyledSubscriptionContainer>
 <ActiveSubscription subscription={clientProfile.subscription[0]}/>
 <HistorySubscription inactiveSubscriptions={clientProfile.subscription}/>
 </StyledSubscriptionContainer>
 </Tabs.Content>
 <Tabs.Content value={"tab2"}>
 <p>events changelog</p>
 </Tabs.Content>
 </Tabs>*/