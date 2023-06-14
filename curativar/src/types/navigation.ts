export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Recover: undefined;
  Authenticated: undefined;
  Post: {postId: number};
  Messages: { postId?: number };
  EditProfile: undefined;
};

export type RootBottomTabParamList = {
  Feed: undefined;
  Interactions: undefined;
  Profile: undefined;
  CreatePost: undefined;
}