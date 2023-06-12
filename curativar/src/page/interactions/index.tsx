import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../../types/navigation";
import { Box, HStack, Select, Text, useColorMode } from "native-base";
import PostsList from "../../components/PostsList";
import { InputStyles } from "./styles";
import { useState } from "react";
import OptionMenu from "../../components/OptionMenu";

type Props = NativeStackScreenProps<RootBottomTabParamList, 'Interactions'>;

export default function Interactions({navigation}: Props){
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const [filter, setFilter] =  useState("last");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleChangeFilterValue = (value: string) => {
    setFilter(value);
  };

  const handleChangeYearValue = (value: string) => {
    setYear(value);
  };

  const handleChangeMonthValue = (value: string) => {
    setMonth(value);
  };

  return (
    <Box backgroundColor={ dark ? "#121827" : "#EDEFF1" }>
        {/* <PostsList 
          posts={mockPosts} 
          naviga
          HeaderFlatist={
            <Box>
              <OptionMenu />
              <Box alignItems={"center"}>
                <Text mt={30} fontFamily={"default"} fontWeight={700} fontSize={32} color={ dark ? "#EDEFF1" :"#121827" }>Interações</Text>

                <Box my={5} width={"80%"}>
                  <Select 
                    {...InputStyles} 
                    variant="rounded" 
                    selectedValue={filter} 
                    accessibilityLabel="Selecione o ano" 
                    placeholder="Ano" 
                    _selectedItem={{
                        bg: "teal.600",
                      }} 
                    mt={1} 
                    onValueChange={handleChangeFilterValue}
                  >
                      <Select.Item label="Mais recentes" value="last" />
                      <Select.Item label="Por data" value="date" />
                  </Select>

                  {filter === "date" ?
                    <HStack space={4} mt={1}>
                      <Box flex={1}>
                        <Select 
                          {...InputStyles} 
                          variant="rounded" 
                          selectedValue={year} 
                          accessibilityLabel="Selecione o ano" 
                          placeholder="Ano" 
                          _selectedItem={{
                            bg: "teal.600",
                          }} 
                          mt={1} 
                          onValueChange={handleChangeYearValue}
                        >
                          {years.map((yearValue, index) => (
                            <Select.Item key={index} label={yearValue} value={yearValue} />
                          ))}
                        </Select>
                      </Box>

                      <Box flex={1.5}>
                        <Select 
                          {...InputStyles} 
                          variant="rounded" 
                          selectedValue={month} 
                          accessibilityLabel="Selecione o mês" 
                          placeholder="Mês" 
                          _selectedItem={{
                            bg: "teal.600",
                          }} 
                          mt={1} 
                          onValueChange={handleChangeMonthValue}
                        >
                          {monthsOfYear.map((monthValue, index) => (
                            <Select.Item key={index} label={monthValue} value={monthValue} />
                          ))}
                        </Select>
                      </Box>
                    </HStack>
                  : null}
                </Box>
              </Box>
            </Box>
          }
          navigation={navigation}
        /> */}
    </Box>
  );
}

const years = ["2022", "2023"];

const monthsOfYear = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

