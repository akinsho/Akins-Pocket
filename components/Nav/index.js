import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';

import { DefaultLink, AppText, LinkText } from './../styled';
import logo from './solar-system.png';

const NavContainer = styled.View`
  width: 100%;
  height: 10%;
  padding: 20px 3px;
  background-color: ${props => props.theme.defaultColor};
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
`;

const Links = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 50;
  height: 50;
  margin-left: 5px;
`;

export default function Nav(props) {
  return (
    <NavContainer>
      <Logo source={logo} alt="solar system logo" />
      <Links>
        <DefaultLink to="/">
          <LinkText dark>Reddit</LinkText>
        </DefaultLink>
        <DefaultLink to="/hackernoon">
          <LinkText dark>Hackernoon</LinkText>
        </DefaultLink>
      </Links>
    </NavContainer>
  );
}
