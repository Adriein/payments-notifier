import React from 'react';
import { StyledNav, StyledNavOptions, StyledLink, StyledLogInButton } from './Styles';
import Button from "../../../Shared/Components/Button";
import { useTranslation } from "react-i18next";

const Header = ({ onClick }: any) => {
  const { t } = useTranslation('landing');
  return (
    <header>
      <StyledNav>
        <StyledNavOptions>
          <StyledLink>
            <Button size={'md'} variant={'filled'} color={'blue'} radius={'md'} onClick={onClick}>{t('login')}</Button>
          </StyledLink>
        </StyledNavOptions>
      </StyledNav>
    </header>
  )
}

export default Header;