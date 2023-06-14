import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImagePickerResponse } from 'react-native-image-picker';
import { Avatar, Box, Button, Input, Pressable, ScrollView, Stack, Text , Select } from "native-base";
import { useContext, useState } from "react";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from "../../context/authContext";
import { BackBoxStyle, ButtonStyles, ContainerStyles, InputStyles } from "./styles";
import SelectImageInput from "../../components/SelectImageInput";
import { RootStackParamList } from "../../types/navigation";
import postImage from "../../services/post-image";

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

const TranslateEmptyFields: {[key:string]: string} = {
  name: "nome",
  email: "email",
  password: "senha",
  confirmPassword: "confirmar senha",
}

export default function Register({navigation}: Props){
  const [isShowing, setIsShowing] = useState(false);
  const [imageAssets, setImageAssets] =  useState<ImagePickerResponse>({});

  const { handleCreateAccount } = useContext(AuthContext);

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
    const onError = () => {
      Snackbar.show({
        text: 'Algo deu errado na criação da sua conta!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    const handleDivergentPassword = () => {
      Snackbar.show({
        text: 'As senhas não são iguais',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    const emptyField = Object.entries(form).filter(([,value]) => value === "").map(([key]) => TranslateEmptyFields[key]);
    
    if(emptyField.length > 0 ) {
      const fields = emptyField.join(", ");
      const text = emptyField.length > 1 ? `Os campos ${fields} estão vazios` : `O campo ${fields} está vazio`;
      Snackbar.show({
        text,
        duration: Snackbar.LENGTH_SHORT,
      });
      return
    }
  
    if (!handleCreateAccount) {
      onError();
      return
    }

    const images = await postImage(imageAssets);

    const imageId = images ? images[0].id : null

    await handleCreateAccount({
      form,
      handleDivergentPassword,
      imageId,
      onError,
    })
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

        <Text fontFamily="default" fontWeight={700} fontSize={30} color="secondary.default">Cadastro</Text>

        <Box width={150}>
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
        </Box>
        
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