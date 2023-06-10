import { Box, HStack, Menu, Pressable, Switch, Text, View, useColorMode, useTheme } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";

export default function OptionMenu(){
  const { colorMode, setColorMode } = useColorMode();
  const [switchValue, setSwitchValue] = useState(colorMode === "dark");
  const { handleLogout } = useContext(AuthContext);
  
  const handleToggle = () => {
    setSwitchValue(!switchValue);
    if(!switchValue){
      setColorMode("dark");
    }
    else{
      setColorMode("light");
    }
    
  }

  return (
    <View>
      <Box mt={4} mr={4} alignItems="flex-end">
        <Menu 
          w="190" 
          top={2}
          right={5}
          borderRadius={15}
          closeOnSelect={false}
          trigger={
            triggerProps => {
              return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <MaterialCommunityIcons 
                  name="dots-vertical" 
                  size={40} 
                  color={colorMode === "dark" ? '#EDEFF1' : '#121827' }
                />
              </Pressable>;
            }
          }
        >
          <Menu.Item onPress={handleToggle} >
            <Text>Tema Escuro</Text>
            <Switch 
              size="sm" 
              onToggle={handleToggle}
              isChecked={switchValue}
            />
          </Menu.Item>
          <Menu.Item onPress={() => handleLogout ? handleLogout() : null}>
            <Text>Logout</Text>
          </Menu.Item>
        </Menu>
      </Box>
    </View>
  );
}