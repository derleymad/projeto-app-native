import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Avatar,
  Box,
  Button,
  Center,
  Input,
  ScrollView,
  Text,
  useColorMode,
} from "native-base";
import Feather from 'react-native-vector-icons/Feather'
import { ImagePickerResponse } from "react-native-image-picker";
import { useEffect, useState } from "react";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../types/navigation";
import { BackBoxStyle, EditButton, NameInputStyle } from "./styles";
import SelectImageInput from "../../components/SelectImageInput";
import postImage from "../../services/post-image";
import { baseUrl, getAxiosInstance } from "../../config/axios";
import { IUser } from "../../types/user";
import getValidImage from "../../helpers/get-valid-image";
import removeImage from "../../services/remove-image";

type Props = NativeStackScreenProps<RootStackParamList>;

function ProfileIcon(){
  return (
    <FontAwesomeIcons
      name="user-alt"
      color="#474B5A"
      size={50}
    />
  );
}

export default function EditProfile({navigation}: Props) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const [imageAssets, setImageAssets] = useState<ImagePickerResponse>({});
  const [user, setUser] = useState<IUser | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userStorage = await AsyncStorage.getItem("user");
        if(!userStorage) return;
        const { id } = JSON.parse(userStorage);
        const axiosInstance = await getAxiosInstance();
        const userData = await axiosInstance.get(`/users/${id}?populate=profile_pic`);
        setName(userData.data.name)
        setUser(userData.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  },[]);

  const handlePressEdit = async () => {
    if(!name.trim()) return

    const nameIsEqual = user?.name.trim().toLowerCase() === name.trim().toLowerCase();

    let imageResponse = null
    if(imageAssets.assets) {
      const imageId =  user?.profile_pic.id ?? -1;
      await removeImage(imageId);
      imageResponse = await postImage(imageAssets);

      if(!imageResponse) return
    }

    if(!imageResponse && nameIsEqual) return

    try {
      let putData = {};
      if(imageResponse && nameIsEqual){
        putData = {profile_pic: imageResponse[0].id};
      }
      else if(imageResponse && !nameIsEqual){
        putData = {name, profile_pic: imageResponse[0].id};
      }
      else{
        putData = {name};
      }
      
      const axiosInstance = await getAxiosInstance(); 
      await axiosInstance.put(`/users/${user?.id}`, putData);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView bgColor={ dark ? "secondary.default" : "gray.50" }>
      <Box {...BackBoxStyle} >
        <Button variant="unstyled" onPress={() => { navigation.goBack() }}>
          <Feather
            name="arrow-left"
            color={dark ? "#EDEFF1" : "#121827" } 
            size={45}
            />
        </Button>
      </Box>

      <Center>
        <Text  
          fontFamily="default" 
          fontWeight={700} 
          fontSize={32} 
          color={ dark ? "#EDEFF1" :"#121827" }
        >Editar Perfil</Text>

        {user ? (
          <>
            <Box width={150}>
              <SelectImageInput setImageAssets={setImageAssets}>
                <Box position="relative">
                  {imageAssets.assets || user.profile_pic ?
                    <Avatar 
                      size={150} 
                      bgColor="gray.50" 
                      my={34} 
                      source={{
                        uri: imageAssets.assets ? 
                        imageAssets.assets[0].uri 
                        :`${baseUrl.replace("/api", "")}${
                          getValidImage(user.profile_pic?.formats)
                        }` 
                      }} 
                    /> : 
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

            <Input 
              {...NameInputStyle} 
              value={name}
              onChangeText={(text) =>setName(text)}
              placeholder="Nome"
            />

            <Button {...EditButton} onPress={handlePressEdit}>Editar</Button>
          </>
        ) : null}
      </Center>
    </ScrollView>
  )
}