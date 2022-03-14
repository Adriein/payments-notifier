import React, { useContext, useEffect } from "react";
import {
  StyledPersonalInfoContainer,
  StyledPersonalSubscriptionInfo,
  StyledProfileContainer,
  StyledSubscriptionContainer, StyledTabContent, StyledTabList, StyledTabTrigger,
  StyledUserName,
  StyledUserResumeContainer,
} from "./Styles";

import { UserProfileProps } from "./UserProfileProps";

import { UsersContext } from "../../Context/UsersContext";
import Loader from "../../../Shared/Components/Loader";
import Avatar from "../../../Shared/Components/Avatar";
import ProfileClientInfo from "./ProfileClientInfo/ProfileClientInfo";
import ActiveSubscription from "./ActiveSubscription";
import HistorySubscription from "./SubscriptionHistory";
import EventList from "./Events";
import { useTranslation } from "react-i18next";
import ClientRevenue from "./ClientRevenue";


const Profile = ({ id }: UserProfileProps) => {
  const { state: { clientProfile, isLoading }, fetchClientProfile } = useContext(UsersContext);

  const { t } = useTranslation('profile');

  useEffect(() => {
    (async () => {
      await fetchClientProfile({ clientId: id });
    })();
  }, []);

  console.log(clientProfile)

  return (
    <StyledProfileContainer>
      {clientProfile && !isLoading ? (
        <>
          <StyledPersonalInfoContainer>
            <StyledUserResumeContainer>
              <Avatar name={clientProfile.username} size={50}/>
              <StyledUserName>{clientProfile.username}</StyledUserName>
              {clientProfile.email}
              <ClientRevenue revenue={clientProfile.revenue}/>
            </StyledUserResumeContainer>
            <ProfileClientInfo client={clientProfile}/>
          </StyledPersonalInfoContainer>
          <StyledPersonalSubscriptionInfo defaultValue={"tab1"}>
            <StyledTabList>
              <StyledTabTrigger value={"tab1"}>{t('subscription_overview_title')}</StyledTabTrigger>
              <StyledTabTrigger value={"tab2"}>{t('subscription_events_title')}</StyledTabTrigger>
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