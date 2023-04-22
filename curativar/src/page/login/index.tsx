import React, { useState } from 'react';
import { Box, Pressable, Input, Stack, Text, Button, KeyboardAvoidingView } from 'native-base';
import Logo from '../../../public/svg/logo.svg';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AnchorButtonStyle, AnchorTextStyle, ButtonStyles, ContainerStyles, InputStyles } from './styles';


export default function Login() {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <Box
      {...ContainerStyles}
      flex={1}
    >
      <Logo width={84} height={84} />
      <Text fontFamily="logo" fontWeight={900} fontSize={48} color="secondary.default">CURATIVAR</Text>
      <Stack marginTop={106} space={4}>
        <Input 
          {...InputStyles}
          placeholder="Email"
          InputLeftElement={
            <FontAwesomeIcons
              name="user-alt"
              color="#474B5A"
              size={20}
              style={{ paddingLeft: 23 }}
            />
          }
        />
        <Input 
          {...InputStyles}
          placeholder="Senha"
          paddingLeft={23}
          type={isShowing ? 'text' : 'password'}
          InputRightElement={
            <Pressable onPress={() => setIsShowing(prevState => !prevState)}>
              <MaterialIcons
                name={isShowing ? 'visibility-off' : 'visibility'}
                color="#474B5A"
                size={25}
                style={{ paddingRight: 23 }}
              />
            </Pressable>
          }
        />

        <Button
          {...ButtonStyles}
          rightIcon={
            <MaterialIcons
              name="login"
              color="#FFF"
              size={20}
              style={{
                paddingLeft: 16.5,
              }}
            />
          }
        >
          Log-in
        </Button>

        <Button
          {...AnchorButtonStyle}
        >
          <Text
          {...AnchorTextStyle(true)}
          >
            Esqueci minha senha
          </Text>
        </Button>
      </Stack>
      <KeyboardAvoidingView flex={1}>
        <Text
          {...AnchorTextStyle()}
          marginTop="auto"
          marginBottom="95px"
        >
          Não possui uma conta?{' '}
          <Text
            {...AnchorTextStyle(true)}
          >
            Cadastre-se
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </Box>
  );
}