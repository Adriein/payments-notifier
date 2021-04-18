import React from 'react';
import PropTypes from 'prop-types';

import { NavLeft, Bottom, Item, ItemText, StyledLogo } from './Styles';
import { FiPlus, FiSettings, FiHelpCircle, FiTrello, FiLogOut } from 'react-icons/fi';
import AboutTooltip from '../../shared/components/AboutTooltip/AboutTooltip';

const propTypes = {
  configAppModalOpen: PropTypes.func.isRequired,
  userCreateModalOpen: PropTypes.func.isRequired,
  pricingCreateModalOpen: PropTypes.func.isRequired,
};

const LeftMenu = ({
  configAppModalOpen,
  userCreateModalOpen,
  pricingCreateModalOpen,
  logout
}) => (
  <NavLeft>
    <Item onClick={userCreateModalOpen}>
      <StyledLogo>
        <FiPlus />
      </StyledLogo>
      <ItemText>Crear usuario</ItemText>
    </Item>
    <Item onClick={configAppModalOpen}>
      <StyledLogo>
        <FiSettings />
      </StyledLogo>
      <ItemText>Configuración</ItemText>
    </Item>
    <Item onClick={pricingCreateModalOpen}>
      <StyledLogo>
        <FiTrello />
      </StyledLogo>
      <ItemText>Mis tarifas</ItemText>
    </Item>
    <Bottom>
      <Item onClick={logout}>
        <StyledLogo>
          <FiLogOut />
        </StyledLogo>
        <ItemText>Salir</ItemText>
      </Item>
      <AboutTooltip
        placement="right"
        offset={{ top: -218 }}
        renderLink={(linkProps) => (
          <Item {...linkProps}>
            <StyledLogo>
              <FiHelpCircle />
            </StyledLogo>
            <ItemText>Ayuda</ItemText>
          </Item>
        )}
      />
    </Bottom>
  </NavLeft>
);

LeftMenu.propTypes = propTypes;

export default LeftMenu;
