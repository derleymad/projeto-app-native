import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import { Box, Button, HStack, Select, Text, useColorMode } from "native-base";
import PostsList from "../../components/PostsList";
import { useCallback, useEffect, useState } from "react";
import OptionMenu from "../../components/OptionMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getInteractions } from "../../services/get-interactions";
import { IPost } from "../../types/post";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Interactions'>;

export default function Interactions({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [isToScrollUp, seIsToScrollUp] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleScroll = (e: any) => {
    const topValue = e.nativeEvent.contentOffset.y;
    topValue > 200 ? setShowScrollTopButton(true) : setShowScrollTopButton(false);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getInteractions(page, userId).then(
      response => {
        setPage(1);
        setTotalPosts(response.meta.pagination.total);
        setPosts(response.data);
        console.log(response.data);
        
        setRefreshing(false);
      }
    );
  }, []);

  const loadMorePosts = async () => {
    setRefreshing(true);
    getInteractions(page + 1, userId).then(
      response => {
        setPage(page + 1);
        setTotalPosts(response.meta.pagination.total);
        setPosts([...posts, ...response.data]);
        setRefreshing(false);
      }
    );
  }

  useEffect(() => {
    AsyncStorage.getItem("user")
    .then(user => {
      if(user){
        const { id } = JSON.parse(user);
        setUserId(id);

        getInteractions(page, id).then(
          response => {
            setTotalPosts(response.meta.pagination.total);
            setPosts(response.data);
          }
        )
      }
    });
  },[]);

  return (
    <Box backgroundColor={ dark ? "#121827" : "#EDEFF1" } flex={1}>
      <PostsList 
        totalPosts={totalPosts}
        loadMorePosts={loadMorePosts}
        refreshing={refreshing}
        isToScrollUp={isToScrollUp}
        seIsToScrollUp={seIsToScrollUp}
        onRefresh={onRefresh}
        handleScroll={handleScroll}
        posts={posts} 
        navigation={navigation}
        HeaderFlatist={
          <Box>
            <OptionMenu />
            <Box alignItems={"center"}>
              <Text 
                mt={30} 
                fontFamily={"default"} 
                fontWeight={700} 
                fontSize={32} 
                color={ dark ? "#EDEFF1" :"#121827" }
              >Interações</Text>
            </Box>
          </Box>
        }
      />
      {showScrollTopButton?
        <Button 
          position={"absolute"} 
          bottom={"40px"} 
          right={"10px"} 
          rounded={"full"}
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

