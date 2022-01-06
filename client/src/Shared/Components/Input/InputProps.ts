import React, { ReactElement } from "react";

export interface InputProps {
  value: string | number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
  invalid?: boolean;
  icon?: ReactElement;
  placeholder?: string;
  type?: string;
  inverted?: boolean;
  hasIcon?: boolean;
}