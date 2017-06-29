import React from 'react';
import { Dimensions } from 'react-native';

import styled from 'styled-components/native';
import IpadLayout from './IpadLayout.js';
import IphoneLayout from './IphoneLayout.js';

import logo from './solar-system.png';

export default function Nav(props) {
  const x = Dimensions.get('window').width;
  const y = Dimensions.get('window').height;
  const iPad = [768, 1024];
  if (iPad.indexOf(x) > -1 && iPad.indexOf(y) > -1) {
    return <IpadLayout logo={logo} />;
  } else {
    return <IphoneLayout logo={logo} />;
  }
}
