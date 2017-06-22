import styled from 'styled-components/native';
import { Link } from 'react-router-native';
import { Text } from 'react-native';

export const PageTitle = styled.Text`
  padding: 1px 0;
  text-align: center;
  font-size: 20;
`;

export const DefaultLink = styled(Link)`
  width: 100%;
`;

export const LinkText = styled.Text`
  color: ${props => (props.dark ? 'white' : 'black')};
  font-weight: 800;
  text-align: center
`;

export const Spinner = styled.View`
  width: 100;
  height: 100;
  border-radius: 50;
  background-color: ${props => props.theme.defaultColor}
`;

export const Body = styled.Text`
  font-size: 17;
  padding: 5px 10px;
`;
