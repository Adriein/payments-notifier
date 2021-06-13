import React, { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { version } from '../../../package.json';

import { MenuItem, StyledHeader, Menu, Version, UserProfile, UserName } from './Styles';
import Avatar from '../../shared/components/Avatar/Avatar';

export default function Header() {
  const { createAvatar, getUsername } = useContext(AuthContext);
  return (
    <StyledHeader>
      {'El logo va aqui pero no lo tengo'}
      <Menu>
        <MenuItem>Usuarios</MenuItem>
        <MenuItem>Dietas</MenuItem>
        <MenuItem>Rutinas</MenuItem>
      </Menu>
      <UserProfile>
        <Version>{`v${version}`}</Version>
        <Avatar name={createAvatar()} />
        <UserName>{getUsername()}</UserName>
      </UserProfile>
    </StyledHeader>
  );
}
