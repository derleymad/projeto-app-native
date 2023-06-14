import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, useColorMode } from "native-base";
import { useCallback, useEffect, useState } from "react";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { RootBottomTabParamList } from "../../types/navigation";
import PostsList from "../../components/PostsList";
import OptionMenu from "../../components/OptionMenu";
import getPosts from "../../services/get-posts";
import { IPost } from "../../types/post";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Feed'>;

export default function Feed({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [isToScrollUp, seIsToScrollUp] = useState(false);

  const handleScroll = (e: any) => {
    const topValue = e.nativeEvent.contentOffset.y;
    topValue > 200 ? setShowScrollTopButton(true) : setShowScrollTopButton(false);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPosts(page).then(
      response => {
        setPage(1);
        setTotalPosts(response.meta.pagination.total);
        setPosts(response.data);
        setRefreshing(false);
      }
    );
  }, []);

  const loadMorePosts = async () => {
    setRefreshing(true);
    getPosts(page + 1).then(
      response => {
        setPage(page + 1);
        setTotalPosts(response.meta.pagination.total);
        setPosts([...posts, ...response.data]);
        setRefreshing(false);
      }
    );
  }

  useEffect(() => {
    getPosts(page).then(
      response => {
        setTotalPosts(response.meta.pagination.total);
        setPosts(response.data);
      }
    );
  },[]);

  return (
    <Box flex={1} backgroundColor={dark ? "#121827" : "#EDEFF1" } >
      <PostsList 
        posts={posts} 
        HeaderFlatist={OptionMenu} 
        navigation={navigation} 
        refreshing={refreshing} 
        onRefresh={onRefresh}
        loadMorePosts={loadMorePosts}
        totalPosts={totalPosts}
        handleScroll={handleScroll}
        isToScrollUp={isToScrollUp}
        seIsToScrollUp={seIsToScrollUp}
      />
      {showScrollTopButton?
        <Button 
          position="absolute" 
          bottom="40px" 
          right="10px" 
          rounded="full"
          onPress={() => {
              seIsToScrollUp(true)
            }
          }
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