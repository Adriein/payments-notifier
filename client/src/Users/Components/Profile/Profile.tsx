import React, { useContext, useEffect } from "react";
import {
  StyledEditIcon,
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
import { useToggle } from "../../../Shared/Hooks/useToggle";
import ProfileForm from "./ProfileForm/ProfileForm";
import { FiEdit3 } from "react-icons/fi";


const Profile = ({ id }: UserProfileProps) => {
  const { state: { clientProfile, isLoading }, fetchClientProfile } = useContext(UsersContext);

  const { t } = useTranslation('profile');
  const [ edit, toggleEdit ] = useToggle();

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
              <StyledUserName>
                {clientProfile.username}
                <StyledEditIcon
                  onClick={toggleEdit}
                  size={'md'}
                  color={'blue'}
                  radius={'xl'}
                  variant={'hover'}
                >
                  <FiEdit3/>
                </StyledEditIcon>
              </StyledUserName>
              {clientProfile.email}
              <ClientRevenue revenue={clientProfile.revenue}/>
            </StyledUserResumeContainer>
            <ProfileClientInfo client={clientProfile}/>
          </StyledPersonalInfoContainer>
          {edit ? <ProfileForm user={clientProfile} toggleEdit={toggleEdit}/> : (
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
          )}
        </>
      ) : <Loader logo size={80} color={"blue"}/>}
    </StyledProfileContainer>
  );
}

export default Profile;