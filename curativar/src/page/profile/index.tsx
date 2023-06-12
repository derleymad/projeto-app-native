import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Avatar, Box, Image, Pressable, ScrollView, Text, useColorMode, useTheme } from "native-base";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import { useWindowDimensions } from "react-native";
import OptionMenu from "../../components/OptionMenu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { getUserPosts } from "../../services/get-user-posts";
import { IPost } from "../../types/post";
import { baseUrl, getAxiosInstance } from "../../config/axios";

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
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPost[]>([]); 
  const [userPic, setUserPic] = useState<string | null>(null); 

  useEffect(() => {
    if(!user) return

    const getData = async () => {
      try {
        const postsResponse = await getUserPosts(user.id);
        const axiosInstance = await getAxiosInstance();
        const userResponse = await axiosInstance.get(`/users/${user.id}?populate=profile_pic`);

        if(userResponse.data.profile_pic){
          setUserPic(userResponse.data.profile_pic.formats.small.url);
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

  return (
    <ScrollView bgColor={ dark ? "secondary.default" : "gray.50" }>
      <OptionMenu />
      <Box 
        alignItems={"center"} 
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

        <Text fontFamily={"default"} fontWeight={700} fontSize={24} color={dark ? "gray.50" : "secondary.default" }>{user?.name}</Text>

        <Box alignItems={"center"} mt={20}>
          <Text fontFamily={"default"} fontWeight={700} fontSize={24} mb={5} color={dark ? "gray.50" : "secondary.default" }>Publicações</Text>

          <Box flexDir={"row"} flexWrap={"wrap"} justifyContent={"center"} style={{gap: 15}}>
            {posts.map((post)=>(  
              <Pressable key={post.id} onPress={()=>{handlePressPost(post.id)}}>
                <Image
                  style={{ borderRadius: 20, height: 150, width: 150 }}
                  source={{
                    uri: `${baseUrl.replace("/api", "")}${post.attributes.image.data.attributes.formats.small.url}`
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
  );
}