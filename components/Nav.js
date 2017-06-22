import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';

import { DefaultLink, LinkText } from './styled';

const NavContainer = styled.View`
  width: 100%;
  height: 10%;
  padding: 20px 10px;
  background-color: ${props => props.theme.defaultColor};
  flex-direction: row;
  justify-content:space-between;
`;

const Logo = styled.Text`
  font-size: 20;
  color: white;
`;

export default function Nav(props) {
  return (
    <NavContainer>
      <Logo>Akin's Pocket</Logo>
      <DefaultLink to="/"><LinkText dark>Home</LinkText></DefaultLink>
    </NavContainer>
  );
}
