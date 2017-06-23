import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
//import { styled } from 'styled-components/native';
import { Container, Spinner } from './styled';

export default function AppLoading(props) {
  return (
    <View>
      <Container>
        <Spinner />
      </Container>
    </View>
  );
}
