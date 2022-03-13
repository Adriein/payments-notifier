import React from "react";

export interface TimelineItemProps {
  color: string;
  bullet: React.ReactNode;
  title: string;
  children: React.ReactElement[] | React.ReactElement;
  isLast?: boolean
}