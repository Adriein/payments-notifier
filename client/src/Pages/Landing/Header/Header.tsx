import React from 'react';
import { StyledNav, StyledNavOptions, StyledLink, StyledLogInButton } from './Styles';
import Button from "../../../Shared/Components/Button";

const Header = ({ onClick }: any) => {
  return (
    <header>
      <StyledNav>
        <StyledNavOptions>
          <StyledLink>
            <Button size={'small'} variant={'fill'} onClick={onClick}>Log in</Button>
          </StyledLink>
        </StyledNavOptions>
      </StyledNav>
    </header>
  )
}

export default Header;