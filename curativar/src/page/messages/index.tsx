import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Box, Button, FlatList, Flex, HStack, Input, Pressable, Text, TextArea, useColorMode } from "native-base";
import { RootStackParamList } from "../../types/navigation";
import { BackBoxStyle, CreateMessageHStackStyle, TextAreaStyle } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import { Dimensions } from "react-native";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Messages'>;

export default function Messages({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width*0.90*0.85);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const userId = "789";

  return  (
    <Box flex={1}>
      <FlatList 
        w={"100%"}
        bgColor={ dark ? "#121827" : "#EDEFF1" }
        p={6}
        data={mockMessages} 
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
          <Box key={index} width={"90%"}>
            <Box alignItems={item.user.id === userId ? "flex-end" : "flex-start"}>
              <Box 
                onLayout={handleLayout}
                p={4}
                width={"85%"} 
                borderTopRightRadius={15}
                borderBottomRadius={15}
                position={"relative"}
                bgColor={dark ? "gray.800" : "gray.300"} 
                mb={mockMessages.length === index + 1 ? 120 : 10} 
              >
                <HStack 
                  maxW={containerWidth}
                  h={"40px"} 
                  position={"absolute"} 
                  bgColor={dark ? "gray.300" : "gray.800"} 
                  top={-25}
                  zIndex={10}
                  borderRadius={50}
                  alignItems={"center"}
                  p={2}
                >
                  {item.user.uri ? (
                      <Avatar mr={2} bg="green.500" alignSelf="center" size="sm" source={{ uri: item.user.uri }}>
                        W
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
                    <Text numberOfLines={1} color={dark ? "secondary.default" : "gray.50"}>{item.user.name}</Text>
                  </Flex>
                </HStack>

                <Text fontFamily={"default"} fontWeight={400} fontSize={"sm"}>{item.message}</Text>
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
        />

        <Button width={60} rounded="full">
          <Ionicons
            name="send"
            color={ "#EDEFF1" } 
            size={30}
          />
        </Button>
      </HStack>
    </Box>
  )
}

const mockMessages = [
  {
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae excepturi eveniet maxime. Optio quasi, saepe beatae tempore consequatur omnis, aspernatur expedita illum ad nostrum in eum repudiandae architecto, doloremque dolorem?",
    user: {
      id: "456",
      name: "Dr. Italo Renan",
      uri: null,
    }
  },
  {
    message: "Aaepe beatae tempore consequatur omnis, aspernatur expedita. Aaepe beatae tempore consequatur omnis, aspernatur expedita. Aaepe beatae tempore consequatur omnis, aspernatur expedita illum ad nostrum in eum repudiandae architecto, doloremque dolorem?",
    user: {
      id: "454",
      name: "Dr. Italo Renan",
      uri: null,
    }
  },
  {
    message: "Amet consectetur adipisicing elit. Molestiae excepturi eveniet maxime. Optio quasi, saepe beatae tempore consequatur omnis, aspernatur expedita illum ad nostrum in eum repudiandae architecto, doloremque dolorem?",
    user: {
      id: "789",
      name: "Dra. Eduarda",
      uri: null,
    }
  }
]

