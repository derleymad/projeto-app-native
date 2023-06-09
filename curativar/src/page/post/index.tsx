import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Actionsheet, Avatar, Box, Button, Center, FlatList, Flex, HStack, Image, ScrollView, Text, VStack, useColorMode, useDisclose } from "native-base";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import { AvatarStyles, BackBoxStyle, HStackStyle, MainVStackStyle, RegularTextStyles, SmallTextStyle, TitleTextStyles, UserNameTextStyles, getImageStyles } from "./styles";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

export default function Post({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [vstackWidth, setVStackWidth] = useState(Dimensions.get('window').width * 0.90);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setVStackWidth(width);
  };

  return  (
    <ScrollView backgroundColor={ dark ? "#121827" : "#EDEFF1" } >
      
    <Box width={"100%"}>
      <Center>
        <Box {...BackBoxStyle}>
          <Button variant="unstyled" onPress={() => { navigation.goBack() }}>
            <Feather
              name="arrow-left"
              color={dark ? "#EDEFF1" : "#121827" } 
              size={45}
            />
          </Button>
        </Box>

        <HStack {...HStackStyle}>
          {mockPost.postCreator.uri ? (
              <Avatar 
                {...AvatarStyles} 
                bg="green.500" 
                source={{ uri: mockPost.postCreator.uri }}
              >
                W
              </Avatar>
            ) : (
              <Avatar {...AvatarStyles} bg="gray.50">
                <FontAwesomeIcons
                  name="user-alt"
                  color="#474B5A"
                  size={13}
                />
              </Avatar>
            )
          }
          
          <Flex flexShrink={1}>
            <Text {...UserNameTextStyles}>{mockPost.postCreator.name}</Text>
          </Flex>
        </HStack>
      </Center>

      <Center mb={6}>
        <VStack onLayout={handleLayout} {...MainVStackStyle}>
          <Box position="relative">
            <Image 
              style={getImageStyles(vstackWidth)}
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg"
              }} alt="Alternate Text" 
              size="xl" 
            />
            <Box bottom={4} right={4} position="absolute">
              <Button 
                rounded={"full"} 
                bgColor={"primary.500"} 
                onPress={() => { navigation.navigate("Messages") }}
              >
                <Foundation
                  name="comments"
                  color="#EDEFF1"
                  size={40}
                />
              </Button>
            </Box>
          </Box>

          <Box p={4}>
            <Text {...SmallTextStyle}>Publicado em 12/03/23 às 20:50</Text>
            <Text {...RegularTextStyles}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto eligendi pariatur deleniti beatae, laudantium nostrum tenetur distinctio at! Dolores, totam facere eveniet rerum asperiores quos quis itaque quasi qui voluptas.</Text>
            <Text {...TitleTextStyles}>Dados do paciente</Text>
            <Text {...RegularTextStyles}>Maria da Dores da Silva Pereira</Text>
            <HStack space={6}>
              <Text {...RegularTextStyles}>64 anos</Text>
              <Text {...RegularTextStyles}>Feminino</Text>
            </HStack>
          </Box>
        </VStack>
      </Center>


      {/* <FlatList
        w={"100%"}
        data={[]} 
        renderItem={({ item }) => (<></>)}
      /> */}
    </Box>
    </ScrollView>
  )
}

const mockPost = {
  id: "123",
  title: "Post 1",
  uri: "https://wallpaperaccess.com/full/317501.jpg",
  postCreator: {
    name: "Dr. Antonio Alves Pereira Tavares",
    uri: null,
  },
}
