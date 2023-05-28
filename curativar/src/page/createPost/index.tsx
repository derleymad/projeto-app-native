import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  useColorMode,
  useTheme,
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from "./styles";
import { useState, useCallback } from "react";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'CreatePost'>;

export default function CreatePost(){
  const { colorMode } = useColorMode();

  const [sex, setSex] = useState('');
  const getDefaultColor = useCallback((isText = false) => {
    const isDarkMode = colorMode === 'dark';
    const isDarkColor = !isDarkMode && isText || isDarkMode && !isText;

    return isDarkColor ? 'secondary.default' : 'gray.50';
  }, [colorMode])

  return (
    <ScrollView flex={1}>
      <Box {...Styles.box} bg={getDefaultColor()}>
          <Text {...Styles.h1} color={getDefaultColor(true)}>Nova Publicação</Text>
          <Button {...Styles.imageInput}>
            <MaterialIcons {...Styles.imageIcon}/>
            <Button {...Styles.addButton}>
              <AntDesign {...Styles.addIcon}/>
            </Button>
          </Button>
          <TextArea {...Styles.area} />
          <Box {...Styles.inputsContainer}>
            <Text {...Styles.h2} color={getDefaultColor(true)}>Paciente</Text>
            <Input {...Styles.input} placeholder="CPF do paciente" />
            <Input {...Styles.input} placeholder="Nome completo do paciente" />
            <Input {...Styles.input} placeholder="Telefone do paciente" />
            <Box {...Styles.containerBottom}>
              <Input {
                ...{
                  ...Styles.input,
                  marginBottom: 0,
                  marginTop: 1,
                  flex: 1,
                  placeholder: "Idade"
                }}
              />
              <Select
                {...Styles.select}
                variant="rounded"
                selectedValue={sex}
                accessibilityLabel="Sexo"
                placeholder="Sexo"
                _selectedItem={{
                    bg: "teal.600",
                  }}
                mt={1}
                flex={1}
                onValueChange={(value: string) => setSex(value)}
              >
                <Select.Item label="Masculino" value="Male" />
                <Select.Item label="Feminino" value="Female" />
              </Select>
            </Box>
          </Box>

          <Button {...Styles.submitBtn}>Publicar</Button>
      </Box>
    </ScrollView>
  )
}