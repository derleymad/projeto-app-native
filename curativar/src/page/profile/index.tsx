import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import SelectImageInput from "../../components/SelectImageInput";
import { Avatar, Box, HStack, Image, ScrollView, Text, VStack, useColorMode, useSafeArea, useTheme } from "native-base";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import { useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Profile'>;

function ProfileIcon(){
  return (
    <FontAwesomeIcons
      name="user-alt"
      color="#474B5A"
      size={50}
    />
  );
}

export default function Profile({navigation}: Props){
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { width, height } = useWindowDimensions();
  const dark = colorMode === "dark";

  return (
    <ScrollView bgColor={ dark ? "secondary.default" : "gray.50" }>
      <Box 
        alignItems={"center"} 
        p={10}
      >
        {/* <SelectImageInput setImageAssets={setImageAssets}> */}
          <Box position="relative">
            {mockUserData.photo ?
              <Avatar size={150} bgColor="gray.50" my={34} source={{
                uri: mockUserData.photo
              }} /> : 
              <Avatar size={150} bgColor="gray.50" my={34}>
                <ProfileIcon />
              </Avatar> 
            }
            <Avatar size={45} bgColor={ dark ? "primary.500" : "primary.default" } my={34} position="absolute" bottom={0} right={0}>
              <FontAwesomeIcons
                name="pen"
                color="#121827"
                size={20}
              /> 
            </Avatar>
          </Box>
        {/* </SelectImageInput> */}

        <Text fontFamily={"default"} fontWeight={700} fontSize={24} color={dark ? "gray.50" : "secondary.default" }>{mockUserData.name}</Text>

        <Box alignItems={"center"} mt={20}>
          <Text fontFamily={"default"} fontWeight={700} fontSize={24} mb={5} color={dark ? "gray.50" : "secondary.default" }>Publicações</Text>

          <Box flexDir={"row"} flexWrap={"wrap"} justifyContent={"center"} style={{gap: 15}}>
            {mockUserData.posts.map((post)=>(  
                <Image
                  key={post.id}
                  style={{ borderRadius: 20, height: 150, width: 150 }}
                  source={{
                    uri: post.uri
                  }} 
                  alt="Publicação" 
                  size="xl" 
                />
              ))
            }
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
}

const mockUserData = {
  id: "123",
  name: "Dra. Ana Paula Cavalcante",
  photo: "https://global-uploads.webflow.com/5f7c5ad0f02de81be2e6417c/62b4adb7e2186b553accde4e_criterios-escolha-residencia-medica.jpg",
  posts: [
    {
      id: "123",
      uri: "https://www.suprevida.com.br/fotos/Imagem-queimadura2124964.jpg",
    },
    {
      id: "456",
      uri: "https://www.suprevida.com.br/fotos/Imagem-queimadura2124964.jpg",
    },
    {
      id: "789",
      uri: "https://www.suprevida.com.br/fotos/Imagem-queimadura2124964.jpg",
    },
  ]
}