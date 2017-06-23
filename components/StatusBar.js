import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const StatusBarContainer = styled.View`
  height: ${STATUSBAR_HEIGHT};
`;

const NativeBar = styled(StatusBar)`
  background-color:${({ theme }) => theme.status};
`;

const CustomBar = props => (
  <StatusBarContainer>
    <NativeBar
      //hidden
      {...props}
      networkActivityIndicatorVisible={false}
      backgroundColor={'blue'}
      barStyle="dark-content"
    />
  </StatusBarContainer>
);

export default CustomBar;
