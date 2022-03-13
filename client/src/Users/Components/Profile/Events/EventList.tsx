import Timeline from "../../../../Shared/Components/Timeline";
import { EventListProps } from "./EventListProps";
import { FiDatabase, FiAlertTriangle, FiClock, FiX } from "react-icons/fi";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { Subscription, SubscriptionHistory } from "../../../types";
import { StyledEventListContainer } from "./Styles";
import React from "react";
import { StyledScrollArea, StyledScrollBar, StyledScrollContent, StyledThumb, StyledViewport } from "../Shared/Styles";

const eventIcon: { [key: string]: React.ReactNode } = {
  created: <FiDatabase/>,
  about_to_expire: <FiAlertTriangle/>,
  expired: <FiClock/>,
  inactive: <FiX/>
}

const EventList = ({ list }: EventListProps) => {
  console.log(list)
  const { format } = useDateFormatter();
  return (
    <StyledEventListContainer>
      <StyledScrollArea>
        <StyledViewport>
          <StyledScrollContent>
            {list.map((subscription: Subscription) => {
              return (
                <Timeline>
                  {subscription.history.map(({ event, createdAt }: SubscriptionHistory, index: number) => {
                    const isLast = index === subscription.history.length - 1;
                    return (
                      <Timeline.Item bullet={eventIcon[event]} title={event} isLast={isLast}>
                        <span>Subscription {subscription.pricing.name} {event} on {format(createdAt)}</span>
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

