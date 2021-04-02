import React from 'react';
import PropTypes from 'prop-types';

import { NavLeft, LogoLink, Bottom, Item, ItemText } from './Styles';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const LeftMenu = ({ issueSearchModalOpen, issueCreateModalOpen }) => (
  <NavLeft>
    <Item onClick={issueSearchModalOpen}>
      <ItemText>Crear usuario</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <ItemText>Configuración</ItemText>
    </Item>

    {/* <Bottom>
      <AboutTooltip
        placement="right"
        offset={{ top: -218 }}
        renderLink={linkProps => (
          <Item {...linkProps}>
            <Icon type="help" size={25} />
            <ItemText>About</ItemText>
          </Item>
        )}
      />
    </Bottom> */}
  </NavLeft>
);

LeftMenu.propTypes = propTypes;

export default LeftMenu;
