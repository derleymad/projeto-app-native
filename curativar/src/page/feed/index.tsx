import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import { Box, useColorMode } from "native-base";
import PostsList from "../../components/PostsList";
import OptionMenu from "../../components/OptionMenu";
import { useEffect, useState } from "react";
import { baseUrl, getAxiosInstance } from "../../config/axios";
import { getPosts } from "../../services/get-posts";
import { IPost } from "../../types/post";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Feed'>;

export default function Feed({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const [posts, setPosts] = useState<IPost[]>([]);
  console.log(posts);
  

  useEffect(() => {
    getPosts().then(
      response => setPosts(response)
    );
  },[]);

  return (
    <Box flex={1} backgroundColor={dark ? "#121827" : "#EDEFF1" }>
      <PostsList posts={posts} HeaderFlatist={OptionMenu} navigation={navigation}/>
    </Box>
  );
}