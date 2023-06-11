import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  useColorMode,
  useTheme,
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from "./styles";
import { useState, useCallback } from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import SelectImageInput from "../../components/SelectImageInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'CreatePost'>;

interface IFormInput {
  description: string,
  cpf: string,
  name: string,
  phone: string,
  age: string,
  sex: string,
};

export default function CreatePost(){
  const { colorMode } = useColorMode();
  const [imageAssets, setImageAssets] =  useState<ImagePickerResponse>({});
  const getDefaultColor = useCallback((isText = false) => {
    const isDarkMode = colorMode === 'dark';
    const isDarkColor = !isDarkMode && isText || isDarkMode && !isText;

    return isDarkColor ? 'secondary.default' : 'gray.50';
  }, [colorMode])

  const { control, handleSubmit } = useForm({
    defaultValues: {
      description: '',
      cpf: '',
      name: '',
      phone: '',
      age: '',
      sex: '',
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = async form => {
    console.log(form);
  }

  return (
    <ScrollView flex={1}>
      <Box {...Styles.box} bg={getDefaultColor()}>
          <Text {...Styles.h1} color={getDefaultColor(true)}>Nova Publicação</Text>
          <SelectImageInput setImageAssets={setImageAssets}>
            <Box {...Styles.imageInput}>
              <MaterialIcons {...Styles.imageIcon}/>
              <Box {...Styles.addButton}>
                <AntDesign {...Styles.addIcon}/>
              </Box>
            </Box>
          </SelectImageInput>
          <TextArea {...Styles.area} />
          <Box {...Styles.inputsContainer}>
            <Text {...Styles.h2} color={getDefaultColor(true)}>Paciente</Text>

            <Controller
              name="cpf"
              control={control}
              render={
                ({ field }) => (
                  <Input 
                    {...Styles.input} 
                    onChangeText={(text) => field.onChange(text)}
                    placeholder="CPF do paciente" 
                  />
                )
              }
            />

            <Controller
              name="name"
              control={control}
              render={
                ({ field }) => (
                  <Input 
                    {...Styles.input} 
                    onChangeText={(text) => field.onChange(text)}
                    placeholder="Nome completo do paciente" 
                  />
                )
              }
            />

            <Controller
              name="phone"
              control={control}
              render={
                ({ field }) => (
                  <Input 
                    {...Styles.input} 
                    onChangeText={(text) => field.onChange(text)}
                    placeholder="Telefone do paciente" 
                  />
                )
              }
            />

            <Box {...Styles.containerBottom}>
              <Controller
                name="age"
                control={control}
                render={
                  ({ field }) => (
                    <Input {
                      ...{
                        ...Styles.input,
                        marginBottom: 0,
                        marginTop: 1,
                        flex: 1,
                        placeholder: "Idade"
                      }}
                      onChangeText={(text) => field.onChange(text)}
                    />
                  )
                }
              />

              <Controller
                name="sex"
                control={control}
                render={
                  ({ field }) => (
                    <Select
                      {...Styles.select}
                      variant="rounded"
                      selectedValue={field.value}
                      accessibilityLabel="Sexo"
                      placeholder="Sexo"
                      _selectedItem={{
                          bg: "teal.600",
                        }}
                      mt={1}
                      flex={1}
                      onValueChange={itemValue => field.onChange(itemValue)}
                    >
                      <Select.Item label="Masculino" value="masculine" />
                      <Select.Item label="Feminino" value="feminine" />
                    </Select>
                  )
                }
              />
            </Box>
          </Box>

          <Button {...Styles.submitBtn} onPress={handleSubmit(onSubmit)}>Publicar</Button>
      </Box>
    </ScrollView>
  )
}