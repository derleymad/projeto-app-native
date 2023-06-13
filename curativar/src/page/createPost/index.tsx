import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import {
  Box,
  Button,
  Image,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  useColorMode,
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from "./styles";
import { useState, useCallback, useContext } from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import SelectImageInput from "../../components/SelectImageInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { getAxiosInstance } from "../../config/axios";
import { useWindowDimensions } from "react-native";
import Snackbar from "react-native-snackbar";
import { postImage } from "../../services/post-image";
import { AuthContext } from "../../context/authContext";
import { postPost } from "../../services/post-post";
import OptionMenu from "../../components/OptionMenu";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'CreatePost'>;

const TranslateEmptyFields: {[key:string]: string} = {
  description: 'descrição',
  cpf: 'cpf',
  name: 'nome',
  phone: 'telefone',
  age: 'idade',
  sex: 'sexo',
}

interface IFormInput {
  patient_id: number | null,
  description: string,
  cpf: string,
  name: string,
  phone: string,
  age: string,
  sex: string,
};

export default function CreatePost({navigation}: Props){
  const { width } = useWindowDimensions();
  const { colorMode } = useColorMode();
  const getDefaultColor = useCallback((isText = false) => {
    const isDarkMode = colorMode === 'dark';
    const isDarkColor = !isDarkMode && isText || isDarkMode && !isText;

    return isDarkColor ? 'secondary.default' : 'gray.50';
  }, [colorMode])
  const [imageAssets, setImageAssets] =  useState<ImagePickerResponse>({});
  const [disableFields, setDisableFields] = useState(true);
  const { user } = useContext(AuthContext);

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      patient_id: null,
      description: '',
      cpf: '',
      name: '',
      phone: '',
      age: '',
      sex: '',
    },
  });

  const handleResetData = () => {
    setImageAssets({});
    reset({
      patient_id: null,
      description: '',
      cpf: '',
      name: '',
      phone: '',
      age: '',
      sex: '',
    });
  }

  const onSubmit: SubmitHandler<IFormInput> = async form => {
    if(!imageAssets.assets){
      Snackbar.show({
        text: "É obrigatório adicionar imagem",
        duration: Snackbar.LENGTH_SHORT,
      });
      return
    }

    const emptyField = Object.entries(form)
                        .filter(([,value]) => value === "")
                        .map(([key]) => TranslateEmptyFields[key]);
    
    if(emptyField.length > 0 ) {
      const fields = emptyField.join(", ");
      const text = emptyField.length > 1 
        ? `Os campos ${fields} estão vazios` 
        : `O campo ${fields} está vazio`;

      Snackbar.show({
        text,
        duration: Snackbar.LENGTH_SHORT,
      });
      return
    }

    const images = await postImage(imageAssets);

    const postError = () => {
      Snackbar.show({
        text: "Não foi possível criar o post. Tente novamente!",
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    if(!images){
      postError();
      return
    }

    try {
      const axiosInstance = await getAxiosInstance();
      let patientId = form.patient_id;

      if(!patientId){
        const patientResponse = await axiosInstance.post("/patients", {
          data:{
            name: form.name,
            cpf: form.cpf,
            phone: form.phone,
            age: form.age,
            sex: form.sex
          }
        }) 
        patientId = patientResponse.data.data.id;
      }   

      await postPost({
        description: form.description, 
        userId: Number(user?.id), 
        imageId: images[0].id,
        patient_id: Number(patientId),
      });

      handleResetData();
      Snackbar.show({
        backgroundColor: '#39AD94',
        textColor: "#fff",
        text: "Post criado com sucesso!",
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch (error) {
      Snackbar.show({
        backgroundColor: "#e92a2a",
        textColor: "#fff",
        text: "Não foi possível criar o post!",
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log(JSON.stringify(error, null, 2));
      postError();
      handleResetData();
    }
  }

  const getPatient = async (cpf: string) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const patientResponse = await axiosInstance.get(`patients?filters[cpf][$eq]=${cpf}`);
      const patient = patientResponse.data.data[0];

      if(!patient) {
        setDisableFields(false);
        setValue("name", "");
        setValue("phone", "");
        setValue("age", "");
        setValue("sex", "");
        setValue("patient_id", null);
        return
      }
    
      const { name, phone, age, sex } = patientResponse.data.data[0].attributes;

      setValue("name", name);
      setValue("phone", phone);
      setValue("age", String(age));
      setValue("sex", sex);
      setValue("patient_id",  patientResponse.data.data[0].id);
      
      setDisableFields(false);
    } catch (error) {
      console.log(error);   
    }
  }

  return (
    <ScrollView flex={1}>
      <Box {...Styles.box} bg={getDefaultColor()}>
          <Box width={"100%"} mb={3}>
            <OptionMenu/>
          </Box>
          <Text {...Styles.h1} color={getDefaultColor(true)}>Nova Publicação</Text>
          <SelectImageInput setImageAssets={setImageAssets}>
              <Box {...Styles.imageInput}>
                {imageAssets.assets ? (
                  <Image
                    style={{ borderRadius: 17, height: 277, width: width }}
                    source={{
                      uri: `${imageAssets.assets[0].uri}`
                    }} 
                    alt="Foto do post"
                  />
                )
                : (
                  <MaterialIcons {...Styles.imageIcon}/>
                )}
                <Box {...Styles.addButton}>
                  <AntDesign {...Styles.addIcon}/>
                </Box>
              </Box>
          </SelectImageInput>

          <Controller
            name="description"
            control={control}
            render={
              ({ field }) => (
                <TextArea 
                  {...Styles.area} 
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                />
              )
            }
          />
          
          <Box {...Styles.inputsContainer}>
            <Text {...Styles.h2} color={getDefaultColor(true)}>Paciente</Text>

            <Controller
              name="cpf"
              control={control}
              render={
                ({ field }) => (
                  <TextInputMask
                    type={'cpf'}
                    value={field.value}
                    customTextInput={Input}
                    onChangeText={(text) => {
                      if(text.length === 14) {
                        setDisableFields(true);
                        getPatient(text);
                      } else {
                        setDisableFields(true)
                      }
                      field.onChange(text)
                    }}
                    customTextInputProps={{
                      ...Styles.input,
                      maxLength: 14,
                      placeholder: "CPF do paciente",
                    }}
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
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    placeholder="Nome completo do paciente"
                    isDisabled = {disableFields}
                  />
                )
              }
            />

            <Controller
              name="phone"
              control={control}
              render={
                ({ field }) => (
                  <TextInputMask
                    type={'cel-phone'}
                    value={field.value}
                    customTextInput={Input}
                    onChangeText={(text) => field.onChange(text.replace(" ",""))}
                    customTextInputProps={{
                      ...Styles.input,
                      maxLength: 15,
                      placeholder: "Telefone do paciente",
                      isDisabled: disableFields
                    }}
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
                      value={field.value}
                      onChangeText={(text) => field.onChange(text)}
                      isDisabled = {disableFields}
                      keyboardType="numeric"
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
                      isDisabled={disableFields}
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