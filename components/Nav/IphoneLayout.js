import React from 'react';
import {
  NavContainer,
  LogoContainer,
  Logo,
  LogoText,
  DefaultLink,
  LinkText,
  Links
} from './styles.js';

export default function IphoneLayout({ logo }) {
  return (
    <NavContainer>
      <LogoContainer>
        <Logo source={logo} alt="solar system logo" />
        <LogoText>Akin's Pocket</LogoText>
      </LogoContainer>
    </NavContainer>
  );
}
