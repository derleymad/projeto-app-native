import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { ImagePickerResponse } from 'react-native-image-picker';
import { Avatar, Box, Button, Input, ScrollView, Stack, Text } from "native-base";
import { ButtonStyles, ContainerStyles, InputStyles } from "./styles";
import { Select } from "native-base";
import { useState } from "react";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import SelectImageInput from "../../components/SelectImageInput";

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

function ProfileIcon(){
  return (
    <FontAwesomeIcons
      name="user-alt"
      color="#474B5A"
      size={50}
    />
  );
}

export default function Register({navigation}: Props){
  const [accountType, setAccountType] = useState('med');
  const [imageAssets, setImageAssets] =  useState<ImagePickerResponse>({});

  const handlePressRegister = () => {}

  return (
    <ScrollView background='primary.default'>
      <Box {...ContainerStyles}>
        <Text fontFamily={"default"} fontWeight={700} fontSize={30} color="secondary.default">Cadastro</Text>

        <SelectImageInput setImageAssets={setImageAssets}>
          <Box position="relative">
            {imageAssets.assets ?
              imageAssets.assets?.map((asset) => (
                <Avatar size={150} bgColor="gray.50" my={34} source={{
                  uri: asset.uri
                }} />
              )) : 
              <Avatar size={150} bgColor="gray.50" my={34}>
                <ProfileIcon />
              </Avatar> 
            }
            <Avatar size={45} bgColor="gray.800" my={34} position="absolute" bottom={0} right={0}>
              <FontAwesomeIcons
                name="pen"
                color="#EDEFF1"
                size={20}
              /> 
            </Avatar>
          </Box>
        </SelectImageInput>
        
        <Stack space={4}>
          <Box>
            <Select {...InputStyles} variant="rounded" selectedValue={accountType} accessibilityLabel="Selecione o tipo de conta" placeholder="Tipo de conta" _selectedItem={{
              bg: "teal.600",
            }} mt={1} onValueChange={itemValue => setAccountType(itemValue)}>
              <Select.Item label="Médico" value="med" />
              <Select.Item label="Enfermeiro" value="enf" />
            </Select>
          </Box>
          <Input 
            {...InputStyles}
            placeholder="Nome"
          />
          <Input 
            {...InputStyles}
            
            placeholder={accountType === "med" ? "CRM" : "CIP"}
          />
          <Input 
            {...InputStyles}
            placeholder="Email"
          />
          <Input 
            {...InputStyles}
            placeholder="Senha"
          />
          <Input 
            {...InputStyles}
            placeholder="Confirmar Senha"
          />
          <Button 
            {...ButtonStyles}
            variant="solid" 
            endIcon={
              <FontAwesomeIcons
                name="user-plus"
                color="#EDEFF1"
                size={15}
                style={{marginLeft: 10}}
              />
            } 
            onPress={handlePressRegister}
          >
            Cadastrar
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  )
}