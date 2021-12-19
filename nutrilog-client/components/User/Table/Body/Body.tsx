import React from "react";
import { StyledBody } from './Styles';
import { BodyProps } from "./BodyProps";
import { UserProps } from "../../UserProps";


const Body: React.FC<BodyProps> = ({ users }: BodyProps) => {

  return (
    <StyledBody>
      {users.map((user: UserProps) => <div key={user.id}>{user.username}</div>)}
    </StyledBody>
  );
}

export default Body;