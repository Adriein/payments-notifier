import React from 'react';
import PropTypes from 'prop-types';

import {
  NavLeft,
  LogoLink,
  Bottom,
  Item,
  ItemText,
  StyledLogo,
} from './Styles';
import { FiPlus, FiSettings, FiHelpCircle } from 'react-icons/fi';
import AboutTooltip from '../../shared/components/AboutTooltip/AboutTooltip';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const LeftMenu = ({ issueSearchModalOpen, issueCreateModalOpen }) => (
  <NavLeft>
    <Item onClick={issueSearchModalOpen}>
      <StyledLogo>
        <FiPlus />
      </StyledLogo>
      <ItemText>Crear usuario</ItemText>
    </Item>
    <Item onClick={issueCreateModalOpen}>
      <StyledLogo>
        <FiSettings />
      </StyledLogo>
      <ItemText>Configuración</ItemText>
    </Item>
    <Bottom>
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
