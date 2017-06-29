import styled from 'styled-components/native';
import { View, StyleSheet, Image } from 'react-native';
import { DefaultLink, AppText, LinkText } from './../styled';

export const NavContainer = styled.View`
  width: 100%;
  height: 10%;
  padding: 20px 3px;
  background-color: ${props => props.theme.defaultColor};
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
`;

export const Links = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoContainer = styled(Links)`

`;

export const LogoText = styled(AppText)`
  font-family: Inconsolata;
  font-size: 20;
  color: white;
  font-weight: 800;
`;

export const Logo = styled.Image`
  width: 50;
  height: 50;
  margin: 0px 8px;
`;
