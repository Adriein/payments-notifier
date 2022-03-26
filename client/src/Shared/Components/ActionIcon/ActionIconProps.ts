import { ReactElement } from "react";

export interface ActionIconProps {
  children: ReactElement;
  isLoading?: boolean;
  onClick: () => void;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  color: 'dark' | 'gray' | 'blue';
  radius: "xs" | "sm" | "md" | "lg" | "xl";
  variant: 'hover'
}