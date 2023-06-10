import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { ImagePickerResponse } from 'react-native-image-picker';
import { Avatar, Box, Button, Input, Pressable, ScrollView, Stack, Text } from "native-base";
import { BackBoxStyle, ButtonStyles, ContainerStyles, InputStyles } from "./styles";
import { Select } from "native-base";
import { useState } from "react";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import SelectImageInput from "../../components/SelectImageInput";
import Feather from 'react-native-vector-icons/Feather'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { baseUrl } from "../../config/axios";

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

type IFormInput = {
  type: string,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
};

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
  const [isShowing, setIsShowing] = useState(false);
  const [accountType, setAccountType] = useState('med');
  const [imageAssets, setImageAssets] =  useState<ImagePickerResponse>({});

  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: 'med',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = async form => {
    try {
      const { assets } = imageAssets;
      console.log(assets);
      
      if(!assets) return;
  
      const [ file ] = assets;
      let data = new FormData();
      data.append('files', { uri: file.uri, name: file.fileName, type: file.type });
  
      const imageResponse = await axios.post(`${baseUrl}/upload`, data, {
        headers: {
          'Content-Type': `multipart/form-data`,
        }
      })
      console.log(imageResponse.data);
      
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      
    }
    
  };

  return (
    <ScrollView background='primary.default'>
      <Box {...ContainerStyles}>
        <Box {...BackBoxStyle}>
          <Button variant="unstyled" onPress={() => { navigation.goBack() }}>
            <Feather
              name="arrow-left"
              color="#121827" 
              size={45}
            />
          </Button>
        </Box>

        <Text fontFamily={"default"} fontWeight={700} fontSize={30} color="secondary.default">Cadastro</Text>

        <SelectImageInput setImageAssets={setImageAssets}>
          <Box position="relative">
            {imageAssets.assets ?
              imageAssets.assets?.map((asset) => (
                <Avatar key={asset.uri} size={150} bgColor="gray.50" my={34} source={{
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
          <Controller
            name="type"
            control={control}
            render={
              ({ field }) => (
                <Select 
                  {...InputStyles} 
                  variant="rounded" 
                  selectedValue={field.value} 
                  accessibilityLabel="Selecione o tipo de conta" 
                  placeholder="Tipo de conta" 
                  onValueChange={itemValue => field.onChange(itemValue)}
                >
                  <Select.Item label="Médico" value="med" />
                  <Select.Item label="Enfermeiro" value="enf" />
                </Select>
              )
            }
          />

          <Controller
            name="name"
            control={control}
            render={
              ({ field }) => (
                <Input 
                  {...InputStyles} 
                  placeholder="Nome" 
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(text)}
                />
              )
            }
          />

          <Controller
            name="email"
            control={control}
            render={
              ({ field }) => (
                <Input 
                  {...InputStyles} 
                  placeholder="Email" 
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(text)}
                />
              )
            }
          />

          <Controller
            name="password"
            control={control}
            render={
              ({ field }) => (
                <Input 
                  {...InputStyles} 
                  placeholder="Senha" 
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(text)}
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
              )
            }
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={
              ({ field }) => (
                <Input 
                  {...InputStyles} 
                  placeholder="Confirmar Senha" 
                  type="password"
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(text)}
                />
              )
            }
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
            onPress={handleSubmit(onSubmit)}
          >
            Cadastrar
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  )
}