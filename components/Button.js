import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ButtonLink, DefaultLink } from './styled';

export default function Button({ value, to, margin }) {
  return (
    <DefaultLink margin={margin} to={to}>
      <ButtonLink>{value || 'See More'} </ButtonLink>
    </DefaultLink>
  );
}
