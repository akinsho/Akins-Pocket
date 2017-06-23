import styled from 'styled-components/native';
import { Link } from 'react-router-native';
import { Text, ActivityIndicator } from 'react-native';

export const AppText = styled.Text`
  font-family: Helvetica;
`;

export const PageTitle = styled(AppText)`
  padding: 5px 0;
  text-align: center;
  font-size: 20;
  background-color: whitesmoke;
`;

export const DefaultLink = styled(Link)`
  margin: 0px 3px;
`;

export const LinkText = styled(AppText)`
  color: ${props => (props.dark ? 'white' : 'black')};
  font-weight: 800;
  text-align: center
`;

export const Spinner = styled(ActivityIndicator)`
  width: 100;
  height: 100;
  align-self: center;
  margin-top: 40%;
`;

export const Body = styled(AppText)`
  font-size: 17;
  padding: 5px 10px;
`;
