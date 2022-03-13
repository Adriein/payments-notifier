import Timeline from "../../../../Shared/Components/Timeline";
import { EventListProps } from "./EventListProps";
import { FiAlertTriangle, FiClock, FiX, FiCheckCircle } from "react-icons/fi";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { Subscription, SubscriptionHistory } from "../../../types";
import { StyledEventListContainer } from "./Styles";
import React from "react";
import { StyledScrollArea, StyledScrollBar, StyledScrollContent, StyledThumb, StyledViewport } from "../Shared/Styles";
import { useTranslation } from "react-i18next";
import Text from "../../../../Shared/Components/Text";

const eventIcon: { [key: string]: { color: string, icon: React.ReactNode } } = {
  created: {
    color: '#10B57D',
    icon: <FiCheckCircle/>
  },
  about_to_expire: {
    color: '#FFCA70',
    icon: <FiAlertTriangle/>
  },
  expired: {
    color: '#F24B69',
    icon: <FiClock/>
  },
  inactive: {
    color: '#dfdfdf',
    icon: <FiX/>
  },
}

const EventList = ({ list }: EventListProps) => {
  const { t } = useTranslation('profile');
  const { format } = useDateFormatter();
  return (
    <StyledEventListContainer>
      <StyledScrollArea>
        <StyledViewport>
          <StyledScrollContent separation={80}>
            {list.map((subscription: Subscription) => {
              return (
                <Timeline key={subscription.id}>
                  {subscription.history.map(({ event, createdAt }: SubscriptionHistory, index: number) => {
                    const isLast = index === subscription.history.length - 1;
                    const { color, icon } = eventIcon[event];
                    return (
                      <Timeline.Item
                        key={index}
                        color={color}
                        bullet={icon}
                        title={t(`subscription_events.${event}`)}
                        isLast={isLast}
                      >
                          <span>
                            {t(
                              `${event}_event_body`,
                              { pricingName: subscription.pricing.name }
                            )}
                          </span>
                        <Text type={"subtitle"}>{format(createdAt)}</Text>
                      </Timeline.Item>
                    )
                  })}
                </Timeline>
              );
            })}
          </StyledScrollContent>
        </StyledViewport>
        <StyledScrollBar>
          <StyledThumb/>
        </StyledScrollBar>
      </StyledScrollArea>
    </StyledEventListContainer>

  );
}

export default EventList;

