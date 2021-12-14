import { ReactElement } from "react";

export interface ButtonProps {
  children: any;
  variant: string;
  icon: ReactElement;
  iconSize: number;
  disabled: boolean;
  loading: boolean;
  onClick: Function;
}