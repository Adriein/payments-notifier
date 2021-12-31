import { ReactElement } from "react";

export interface ButtonProps {
  children?: any;
  icon?: ReactElement;
  iconSize?: number;
  disabled?: boolean;
  isLoading?: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'fill' | 'icon';
  onClick?: Function;
  type?: string
}