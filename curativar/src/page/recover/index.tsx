import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Box, Button, Center, Input, ScrollView, Text, useColorMode } from "native-base";
import { BackBoxStyle, ButtonStyles, InputStyles, NormalTextStyle, TitleTextStyle } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Recover'>;

export default function Recover({navigation}: Props){
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(0);

  const handleSendEmail = () => {
    setStep(step => step + 1);
  }

  const handleSendCode = () => {
    setStep(step => step + 1);
  }

  const handleSendPassword = () => {
    navigation.navigate("Login");
  }

  return (
    <ScrollView background='primary.default'>
      <Center>
        <Box {...BackBoxStyle}>
          <Button variant="unstyled" onPress={() => { navigation.goBack() }}>
            <Feather
              name="arrow-left"
              color="#121827" 
              size={45}
            />
          </Button>
        </Box>
        <Text {...TitleTextStyle}>Recuperar Senha</Text>

        {step === 0 ?
          <>  
            <Input 
              {...InputStyles}
              placeholder="Digite o seu e-mail" 
              onChangeText={(email)=>{setEmail(email)}}
            />
            <Button {...ButtonStyles} onPress={handleSendEmail}>Enviar</Button>
          </>
        : null }

        {step === 1 ?
          <>
            <Text {...NormalTextStyle} textAlign="center">
              Enviamos o código para o e-mail {email}
            </Text>
            <Input 
              {...InputStyles} 
              placeholder="Digite o código"
              onChangeText={(code)=>{setVerificationCode(code)}}
            />
            <Button {...ButtonStyles} onPress={handleSendCode}>Enviar</Button>
          </>
        : null }

        {step === 2 ?
          <>
            <Input {...InputStyles} placeholder="Nova senha"/>
            <Input {...InputStyles} placeholder="Confirmar senha"/>
            <Button {...ButtonStyles} onPress={handleSendPassword}>Recuperar</Button>
          </>
        : null }  
      </Center>
    </ScrollView>
  );
}