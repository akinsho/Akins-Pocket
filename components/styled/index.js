import styled from 'styled-components/native';
import { Link } from 'react-router-native';
import { Text, ActivityIndicator, Image, View } from 'react-native';

export const AppText = styled.Text`
  font-family: Roboto;
`;

export const PageTitle = styled(AppText)`
  padding: 5px 0;
  text-align: center;
  font-size: 20;
  background-color: whitesmoke;
`;

export const DefaultLink = styled(Link)`
  ${props => (props.margin ? 'margin: 0px 8px;' : '')}
`;

export const LinkText = styled(AppText)`
  color: ${props => (props.dark ? 'white' : 'black')};
  font-weight: 800;
  text-align: center;
  font-size: 20;
`;

export const Spinner = styled(ActivityIndicator)`
  width: 100;
  height: 100;
  align-self: center;
`;

export const Body = styled(AppText)`
  font-size: 17;
  padding: 5px 10px;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const Topic = styled.View`
  height: 50;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;

export const SmallIcon = styled.Image`
  width: 50;
  height: 50;
`;

export const ItemTitle = styled(AppText)`
  font-size: 20;
  padding: 1px 3px;
  margin-bottom: 10px;
`;

export const ItemContent = styled.View`
  height: 150;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const ItemArticle = styled.View`
  width: 70%;
  align-items: flex-start;
`;
