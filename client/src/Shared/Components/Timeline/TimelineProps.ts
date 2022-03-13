import React from "react";
import { TimelineItemProps } from "./TimelineItemProps";

export interface TimelineProps {
  children: React.ReactElement<TimelineItemProps>[] | React.ReactElement<TimelineItemProps>
}