import React from "react";

import { StyledBody } from './Styles';

import Button from "../../../Shared/Button";
import { BodyProps } from "./BodyProps";


const Body: React.FC<BodyProps> = ({ users }: BodyProps) => {
  
  return (
    <StyledBody>
      {users.map((user: any) => <div>{user.name}</div>)}
    </StyledBody>
  );
}

export default Body;