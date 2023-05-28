import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Image, Pressable, FlatList, useColorMode, Avatar, Text, HStack, Flex } from "native-base";
import { useWindowDimensions } from "react-native";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import OptionMenu from "./OptionMenu";
import { ReactElement } from "react";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

interface PostsListProps{
  posts: {
    id: string,
    title: string,
    uri: string,
    postCreator: {
      name: string,
      uri: string | null,
    },
  }[];
  HeaderFlatist?: any;
}

export default function PostsList({ posts, HeaderFlatist }: PostsListProps){
  const { width } = useWindowDimensions();

  const handlePressPost = () => {}

  return (
    <FlatList 
      w={"100%"}
      data={posts} 
      ListHeaderComponent={HeaderFlatist ? HeaderFlatist : null}
      renderItem={({ item }) => (
        <Box width={"100%"} alignItems={"center"}>
          <Pressable 
            width={"80%"}  
            my={3} 
            position={"relative"} 
            onPress={handlePressPost}
          >
            <Image
              style={{ borderRadius: 20, height: 280, width: width }}
              source={{
                uri: `${item.uri}`
              }} 
              alt="Alternate Text" 
              size="xl" 
              
            />
            
            <HStack 
              w={"190px"} 
              h={"45px"} 
              position={"absolute"} 
              bgColor={"rgba(18, 24, 39, 0.8)"} 
              left={"14px"} 
              top={"14px"}
              borderRadius={50}
              alignItems={"center"}
              p={2}
            >
              {item.postCreator.uri ? (
                  <Avatar mr={2} bg="green.500" alignSelf="center" size="sm" source={{ uri: item.postCreator.uri }}>
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
                <Text numberOfLines={1} color="gray.50">{item.postCreator.name}</Text>
              </Flex>
            </HStack>
          </Pressable>
        </Box>
      )}
      keyExtractor={item => item.id}
    />
  );
}