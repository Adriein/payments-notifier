import { ChangeEvent } from "react";

export interface CheckboxProps {
  text: string;
  value?: boolean;
  onChange?: (event: any) => void;
}