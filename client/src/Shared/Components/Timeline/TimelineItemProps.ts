import React from "react";

export interface TimelineItemProps {
  bullet: React.ReactNode;
  title: string;
  children: React.ReactElement[] | React.ReactElement;
  isLast?: boolean
}