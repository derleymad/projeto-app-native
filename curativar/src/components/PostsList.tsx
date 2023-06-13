import { Box, Image, Pressable, FlatList, Avatar, Text, HStack, Flex, Button } from "native-base";
import { RefreshControl, useWindowDimensions } from "react-native";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import { IPost } from "../types/post";
import { baseUrl } from "../config/axios";
import { useEffect, useRef } from "react";

interface PostsListProps{
  posts: IPost[];
  HeaderFlatist?: any;
  navigation: any
  refreshing: boolean;
  onRefresh: () => void;
  loadMorePosts: () => void;
  totalPosts: number;
  handleScroll: (e: any) => void;
  isToScrollUp: boolean;
  seIsToScrollUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostsList({ 
  posts, 
  HeaderFlatist, 
  navigation, 
  refreshing, 
  onRefresh, 
  loadMorePosts,
  totalPosts,
  handleScroll,
  isToScrollUp,
  seIsToScrollUp,
}: PostsListProps){
  const { width } = useWindowDimensions();
  const scrollRef = useRef<any>();
  const handlePressPost = (id: number) => { navigation.navigate("Post", {postId: id}) };
  const handleScrollUp = () => {
    scrollRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
    seIsToScrollUp(false);
  }

  useEffect(() => {
    if(isToScrollUp) handleScrollUp();
  },[isToScrollUp]);

  return (
    <FlatList 
      ref={scrollRef}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={handleScroll}
      w={"100%"}
      data={posts} 
      ListHeaderComponent={HeaderFlatist ? HeaderFlatist : null}
      ListFooterComponent={
        totalPosts > posts.length ? (
          <Button 
            variant={"ghost"} 
            _text={{fontSize: 18}} 
            onPress={loadMorePosts}
          >Carregar mais</Button>
        )
        : (
          <></>
        )
      }
      renderItem={({ item: { id, attributes } }) => (
        <Box width={"100%"} alignItems={"center"}>
          <Pressable 
            width={"80%"}  
            my={3} 
            position={"relative"} 
            onPress={() => { handlePressPost(id) }}
          >
            <Image
              style={{ borderRadius: 20, height: 280, width: width }}
              source={{
                uri: `${baseUrl.replace("/api", "")}${attributes.image.data.attributes.url}`
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
              {attributes.users_permissions_user.data.attributes.profile_pic.data ? (
                  <Avatar 
                    mr={2} 
                    bg="green.500" 
                    alignSelf="center" 
                    size="sm" 
                    source={{ uri: `${baseUrl.replace("/api", "")}${attributes.users_permissions_user.data.attributes.profile_pic.data.attributes.formats.small.url}` }}
                  >
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
                <Text numberOfLines={1} color="gray.50">{attributes.users_permissions_user.data.attributes.name}</Text>
              </Flex>
            </HStack>
          </Pressable>
        </Box>
      )}
      // keyExtractor={item => item.id}
    />
  );
}