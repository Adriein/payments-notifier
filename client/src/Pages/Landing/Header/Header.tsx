import React from 'react';
import { StyledNav, StyledNavOptions, StyledLink, StyledLogInButton } from './Styles';
import Button from "../../../Shared/Components/Button";
import { useTranslation } from "react-i18next";

const Header = ({ onClick }: any) => {
  const { t } = useTranslation('login');
  return (
    <header>
      <StyledNav>
        <StyledNavOptions>
          <StyledLink>
            <Button size={'small'} variant={'fill'} onClick={onClick}>{t('button')}</Button>
          </StyledLink>
        </StyledNavOptions>
      </StyledNav>
    </header>
  )
}

export default Header;