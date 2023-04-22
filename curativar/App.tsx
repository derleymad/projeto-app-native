import React from 'react';
import {NativeBaseProvider, Box, Text} from 'native-base';
import theme from './src/assets/theme';
import Login from './src/page/login';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Login />
    </NativeBaseProvider>
  );
}
