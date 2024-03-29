import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Box, Button, Image, Pressable, ScrollView, Text, useColorMode } from "native-base";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { RefreshControl } from "react-native";
import { RootStackParamList } from "../../types/navigation";
import OptionMenu from "../../components/OptionMenu";
import { getUserPosts } from "../../services/get-user-posts";
import { IPost } from "../../types/post";
import { baseUrl, getAxiosInstance } from "../../config/axios";
import { IUser } from "../../types/user";
import getValidImage from "../../helpers/get-valid-image";

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

export default function Profile({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const scrollRef = useRef<any>();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]); 
  const [userPic, setUserPic] = useState<string | null>(null); 
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if(!user) return;
      const { id } = JSON.parse(user);
      const axiosInstance = await getAxiosInstance();
      const userData = await axiosInstance.get(`/users/${id}?populate=profile_pic`);
      const postsResponse = await getUserPosts(id);
      const userResponse = await axiosInstance.get(`/users/${id}?populate=profile_pic`);

      if(userResponse.data.profile_pic){
        setUserPic(userResponse.data.profile_pic.formats.small.url);
      }
      setPosts(postsResponse);

      setUser(userData.data);
    }

    getUser();
  },[]);

  useEffect(() => {
    if(!user) return

    const getData = async () => {
      try {
        const postsResponse = await getUserPosts(user.id);
        const axiosInstance = await getAxiosInstance();
        const userResponse = await axiosInstance.get(`/users/${user.id}?populate=profile_pic`);

        if(userResponse.data.profile_pic){
          const imageUrl = getValidImage(userResponse.data.profile_pic.formats, 'small');
          setUserPic(imageUrl);
        }
        setPosts(postsResponse);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  },[user]);
  
  const handlePressPost = (id: number) => { 
    navigation.navigate("Post", { postId: id }) 
  };

  const onRefresh = useCallback(() => {
    if(!user) return

    setRefreshing(true);
    getUserPosts(user.id).then(
      response => {
        setPosts(response);
        setRefreshing(false);
      }
    );
  }, []);

  const handleScroll = (e: any) => {
    const topValue = e.nativeEvent.contentOffset.y;
    topValue > 200 ? setShowScrollTopButton(true) : setShowScrollTopButton(false);
  }

  const handleScrollUp = () => {
    scrollRef.current?.scrollTo({
      offset: 0,
      animated: true,
    });
  }

  return (
    <Box position="relative" flex={1}>
      <ScrollView 
        ref={scrollRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        bgColor={ dark ? "secondary.default" : "gray.50" }
        onScroll={handleScroll}
      >
        <OptionMenu />
        <Box 
          alignItems="center" 
          position="relative"
          p={10}
        >
          <Box position="relative">
            {userPic ?
              <Avatar size={150} bgColor="gray.50" my={34} source={{
                uri: `${baseUrl.replace("/api", "")}${userPic}`
              }} /> : 
              <Avatar size={150} bgColor="gray.50" my={34}>
                <ProfileIcon />
              </Avatar> 
            }
          </Box>

          <Text fontFamily="default" fontWeight={700} textAlign="center" fontSize={24} color={dark ? "gray.50" : "secondary.default"}>{user?.name}</Text>

          <Box alignItems="center" mt={20}>
            <Text fontFamily="default" fontWeight={700} fontSize={24} mb={5} color={dark ? "gray.50" : "secondary.default" }>Publicações</Text>

            <Box flexDir="row" flexWrap="wrap" justifyContent="center" style={{gap: 15}}>
              {posts.map((post)=>(  
                  <Pressable key={post.id} onPress={()=>{handlePressPost(post.id)}}>
                    <Image
                      style={{ borderRadius: 20, height: 150, width: 150 }}
                      source={{
                        uri: `${baseUrl.replace("/api", "")}${
                          getValidImage(post.attributes.image.data.attributes.formats, 'thumbnail')
                        }`
                      }} 
                      alt="Publicação" 
                      size="xl" 
                    />
                  </Pressable>
                ))
              }
            </Box>
          </Box>
        </Box>
      </ScrollView>
      {showScrollTopButton?
        <Button 
          position="absolute" 
          bottom="40px" 
          right="10px" 
          rounded="full"
          onPress={handleScrollUp}
        >
          <SimpleLineIcons
            name="arrow-up"
            color= "#EDEFF1"
            size={25}
          />
        </Button>
      : null}
    </Box>
  );
}