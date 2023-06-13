import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Actionsheet, Avatar, Box, Button, Center, FlatList, Flex, HStack, Image, ScrollView, Text, VStack, useColorMode, useDisclose } from "native-base";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import { AvatarStyles, BackBoxStyle, HStackStyle, MainVStackStyle, RegularTextStyles, SmallTextStyle, TitleTextStyles, UserNameTextStyles, getImageStyles } from "./styles";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { getPost } from "../../services/get-post";
import { IPost } from "../../types/post";
import { baseUrl } from "../../config/axios";
import moment from "moment";

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

const TranslateSex: {[key:string]: string} = {
  "masculine": "Masculino",
  "feminine": "Feminino",
}

export default function Post({route, navigation}: Props){
  const { postId } = route.params;
  const [post, setPost] = useState<IPost| null>(null);

  useEffect(() => {
    getPost(postId).then(response => setPost(response));
  },[]);
  
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [vstackWidth, setVStackWidth] = useState(Dimensions.get('window').width * 0.90);

  const handlePressMessage = () => {
    navigation.navigate("Messages", { postId: post?.id })
  }

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setVStackWidth(width);
  };

  const getDateTime = () => {
    if(!post) return
    const dateTime = new Date(post.attributes.patient.data.attributes.publishedAt);

    return moment(dateTime).format("DD/MM/YYYY, HH:mm:ss");
  }

  return  (
    <ScrollView backgroundColor={ dark ? "#121827" : "#EDEFF1" } >
      {post ?
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
              {post.attributes.users_permissions_user.data.attributes.profile_pic.data ? (
                  <Avatar 
                    {...AvatarStyles} 
                    bg="green.500" 
                    source={{ uri: `${baseUrl.replace("/api", "")}${post.attributes.users_permissions_user.data.attributes.profile_pic.data.attributes.formats.thumbnail.url}`}}
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
                <Text {...UserNameTextStyles}>{post.attributes.users_permissions_user.data.attributes.name}</Text>
              </Flex>
            </HStack>
          </Center>

          <Center mb={6}>
            <VStack onLayout={handleLayout} {...MainVStackStyle}>
              <Box position="relative">
                <Image 
                  style={getImageStyles(vstackWidth)}
                  source={{
                    uri: `${baseUrl.replace("/api", "")}${post.attributes.image.data.attributes.formats.medium.url}`
                  }} alt="Alternate Text" 
                  size="xl" 
                />
                <Box bottom={4} right={4} position="absolute">
                  <Button 
                    rounded={"full"} 
                    bgColor={"primary.500"} 
                    onPress={handlePressMessage}
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
                <Text {...SmallTextStyle}>Publicado em {getDateTime()}</Text>
                <Text {...RegularTextStyles}>{post.attributes.description}</Text>
                <Text {...TitleTextStyles}>Dados do paciente</Text>
                <Text {...RegularTextStyles}>{post.attributes.patient.data.attributes.name}</Text>
                <HStack space={6}>
                  <Text {...RegularTextStyles}>{post.attributes.patient.data.attributes.age} anos</Text>
                  <Text {...RegularTextStyles}>{TranslateSex[post.attributes.patient.data.attributes.sex]}</Text>
                  <Text {...RegularTextStyles}>{post.attributes.patient.data.attributes.phone}</Text>
                </HStack>
              </Box>
            </VStack>
          </Center>
        </Box>
      : null }
      
    </ScrollView>
  )
}