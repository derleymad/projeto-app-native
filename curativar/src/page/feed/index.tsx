import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import { Box, useColorMode } from "native-base";
import PostsList from "../../components/PostsList";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Feed'>;

export default function Feed({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Box backgroundColor={dark ? "#121827" : "#EDEFF1" }>
      <PostsList posts={mockPosts} />
    </Box>
  );
}

const mockPosts = [
  {
    id: "123",
    title: "Post 1",
    uri: "https://wallpaperaccess.com/full/317501.jpg",
    postCreator: {
      name: "Dr. Antonio Alves Pereira",
      uri: null,
    },
  },
  {
    id: "456",
    title: "Post 2",
    uri: "https://wallpaperaccess.com/full/317501.jpg",
    postCreator: {
      name: "Dra. Maria Cavalcante Barroso",
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  },
  {
    id: "789",
    title: "Post 3",
    uri: "https://wallpaperaccess.com/full/317501.jpg",
    postCreator: {
      name: "Dr. Italo Renan",
      uri: null,
    },
  },
  {
    id: "741",
    title: "Post 4",
    uri: "https://wallpaperaccess.com/full/317501.jpg",
    postCreator: {
      name: "Dra. Eduada Amorim",
      uri: null,
    },
  },
]