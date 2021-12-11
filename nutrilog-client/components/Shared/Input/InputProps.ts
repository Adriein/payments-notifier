import { IconType } from "react-icons";

export interface InputProps {
  className?: string,
  value: string | number,
  invalid?: boolean,
  onChange: any,
  icon?: IconType,
}