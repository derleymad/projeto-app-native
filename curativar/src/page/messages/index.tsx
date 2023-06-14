import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Box, Button, FlatList, Flex, HStack, Input, Pressable, Text, TextArea, useColorMode } from "native-base";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackBoxStyle, CreateMessageHStackStyle, TextAreaStyle } from "./styles";
import { RootStackParamList } from "../../types/navigation";
import { postMessage } from "../../services/post-message";
import { getMessages } from "../../services/get-messages";
import { IMessage } from "../../types/message";
import { baseUrl } from "../../config/axios";
import getValidImage from "../../helpers/get-valid-image";

type Props = NativeStackScreenProps<RootStackParamList, 'Messages'>;

export default function Messages({route, navigation}: Props){
  const { colorMode } = useColorMode();
  const { postId } = route.params;
  const dark = colorMode === "dark";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState(-1);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width*0.90*0.85);
  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const handlePressSendMessage = async () => {
    if(!postId || userId === -1) return

    if(message.trim()){
      setMessage("");
      await postMessage({message, postId, userId});
      const { data } = await getMessages(postId);
      const orderedMessages = data.sort((a, b) => new Date(a.attributes.publishedAt) > new Date(b.attributes.publishedAt) ? -1 : 1)
      setMessages(orderedMessages);
    }
  }

  const getColor = (isUser: boolean) => {
    if(isUser){
      return dark ? "primary.700" : "primary.400"
    }
    
      return dark ? "gray.800" : "gray.300"
    
  }

  const getNewMessages = () => {
    if(!postId) return

    AsyncStorage.getItem("user")
    .then(user => {
      if(user){
        const { id } = JSON.parse(user);
        setUserId(id);
      }
    });

    getMessages(postId).then(
      response => {
        const { data } = response;
        const orderedMessages = data.sort((a, b) => new Date(a.attributes.publishedAt) > new Date(b.attributes.publishedAt) ? -1 : 1)
        
        setMessages(orderedMessages);
      }
    );
  }

  useEffect(() => {
    getNewMessages();
  },[]);

  useEffect(() => {
    const timer = setInterval(() => {
      getNewMessages();
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  return  (
    <Box flex={1}>
      <FlatList 
        w="100%"
        bgColor={ dark ? "#121827" : "#EDEFF1" }
        p={6}
        data={messages} 
        ListHeaderComponent={
          <Box {...BackBoxStyle}>
            <Button variant="unstyled" onPress={() => { navigation.goBack() }}>
              <Feather
                name="arrow-left"
                color={dark ? "#EDEFF1" : "#121827" } 
                size={45}
              />
            </Button>
          </Box>
        }
        renderItem={({ item, index }) => (
          <Box key={index} width="95%">
            <Box alignItems={item.attributes.users_permissions_user.data.id === userId ? "flex-end" : "flex-start"}>
              <Box 
                onLayout={handleLayout}
                p={4}
                width="80%" 
                borderTopRightRadius={item.attributes.users_permissions_user.data.id === userId ? 0 : 15}
                borderTopLeftRadius={item.attributes.users_permissions_user.data.id === userId ? 15 : 0}
                borderBottomRadius={15}
                position="relative"
                bgColor={getColor(item.attributes.users_permissions_user.data.id === userId)} 
                mb={messages.length === index + 1 ? 120 : 10} 
              >
                <HStack 
                  maxW={containerWidth}
                  h="40px" 
                  position="absolute" 
                  bgColor={dark ? "gray.300" : "gray.800"} 
                  top={-25}
                  right={item.attributes.users_permissions_user.data.id === userId ? 0 : undefined}
                  zIndex={10}
                  borderRadius={50}
                  alignItems="center"
                  p={2}
                >
                  {item.attributes.users_permissions_user.data.attributes.profile_pic.data ? (
                      <Avatar 
                        mr={2} 
                        bg="green.500" 
                        alignSelf="center" 
                        size="sm" 
                        source={{ 
                          uri: `${baseUrl.replace("/api", "")}${
                            getValidImage(item.attributes.users_permissions_user.data.attributes.profile_pic.data.attributes.formats, 'thumbnail')
                          }` 
                        }}
                      >
                        {item.attributes.users_permissions_user.data.attributes.name[0]}
                      </Avatar>
                    ) : (
                      <Avatar mr={2} bg="gray.50"  alignSelf="center" size="sm" >
                        <FontAwesomeIcons
                          name="user-alt"
                          color="#474B5A"
                          size={13}
                        />
                      </Avatar>
                    )
                  }
                  
                  <Flex flexShrink={1}>
                    <Text numberOfLines={1} color={dark ? "secondary.default" : "gray.50"}>
                      {item.attributes.users_permissions_user.data.attributes.name}
                    </Text>
                  </Flex>
                </HStack>

                <Text fontFamily="default" fontWeight={500} fontSize="md">{item.attributes.message}</Text>
              </Box>
            </Box>
          
          </Box>
        )}
      />

      <HStack 
        {...CreateMessageHStackStyle} 
        position="absolute"
      >
        <TextArea 
          {...TextAreaStyle} 
          bgColor={dark ? "primary.300" : "primary.200"}
          onChangeText={text => setMessage(text)}
          value={message}
        />

        <Button width={60} rounded="full" onPress={handlePressSendMessage}>
          <Ionicons
            name="send"
            color="#EDEFF1" 
            size={30}
          />
        </Button>
      </HStack>
    </Box>
  )
}