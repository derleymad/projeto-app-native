import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import OptionMenu from "../../components/OptionMenu";
import { Box, ScrollView } from "native-base";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Feed'>;

export default function Feed({navigation}: Props){

  return (
    <Box>
      <ScrollView>
        <OptionMenu />
      </ScrollView>
    </Box>
  );
}