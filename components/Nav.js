import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';

const NavContainer = styled.View`
  width: 100%;
  height: 5%;
  padding: 2%;
  background-color: skyblue;
  flex-direction: row;
  justify-content: center;
`;

const Logo = styled.Text`
  font-size: 20;
  color: white;
`;

export default function Nav(props) {
  return (
    <NavContainer>
      <Logo>Akin's Pocket</Logo>
    </NavContainer>
  );
}
