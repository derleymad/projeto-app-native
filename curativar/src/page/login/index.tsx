import React, { useContext, useEffect, useState } from 'react';
import { Box, Pressable, Input, Stack, Text, Button, KeyboardAvoidingView, ScrollView, Center } from 'native-base';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnchorButtonStyle, AnchorTextStyle, ButtonStyles, ContainerStyles, InputStyles } from './styles';
import Logo from '../../../public/svg/logo.svg';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAxiosInstance } from '../../config/axios';
import { AuthContext } from '../../context/authContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [isShowing, setIsShowing] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  const handlePressLogin = () => {
    if(!handleLogin) return
    handleLogin(user, password, setShowError);
  }

  return (
    <ScrollView background='primary.default'>
      <Box
        {...ContainerStyles}
        flex={1}
      >
        <Logo width={84} height={84} />
        <Text fontFamily="logo" fontWeight={900} fontSize={48} color="secondary.default">CURATIVAR</Text>
        <Stack marginTop={106} space={4}>
          <Input 
            {...InputStyles}
            placeholder="Usuário ou Email"
            onChangeText={(user) => setUser(user)}
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
            onChangeText={(password) => setPassword(password)}
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

          { showError ?
            <Center>
              <Text fontFamily="default" color="red.600" fontWeight={700}>Email ou senha incorretos</Text>
            </Center>
          : null}

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
            onPress={handlePressLogin}
          >
            Log-in
          </Button>

          <Button
            {...AnchorButtonStyle}
            onPress={() => navigation.navigate("Recover")}
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
            marginTop="90px"
          >
            Não possui uma conta?{' '}
            <Text
              {...AnchorTextStyle(true)}
              onPress={() => navigation.navigate("Register")}
            >
              Cadastre-se
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </Box>
    </ScrollView>
  );
}