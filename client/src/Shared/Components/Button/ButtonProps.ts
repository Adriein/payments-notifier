import { ReactElement } from "react";

export interface ButtonProps {
  children: string;
  onClick?: () => void;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  color: 'dark' | 'gray' | 'blue';
  radius: "xs" | "sm" | "md" | "lg" | "xl";
  variant: 'hover' | 'filled';
  type?: 'submit';
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  isLoading?: boolean;
}