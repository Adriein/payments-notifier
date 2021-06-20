import React, { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { version } from '../../../package.json';

import * as Styled from './Styles';
import Avatar from '../../shared/components/Avatar/Avatar';

import logo from '../../img/Grupo4.png';

export default function Header() {
  const { createAvatar, getUsername } = useContext(AuthContext);
  return (
    <Styled.Header>
      <Styled.LogoContainer>
        <Styled.Logo src={logo} />
      </Styled.LogoContainer>

      <Styled.Menu>
        <Styled.MenuItem>Usuarios</Styled.MenuItem>
        <Styled.MenuItem>Dietas</Styled.MenuItem>
        <Styled.MenuItem>Rutinas</Styled.MenuItem>
      </Styled.Menu>
      <Styled.UserProfile>
        <Styled.Version>{`v${version}`}</Styled.Version>
        <Avatar name={createAvatar()} />
        <Styled.UserName>{getUsername()}</Styled.UserName>
      </Styled.UserProfile>
    </Styled.Header>
  );
}
