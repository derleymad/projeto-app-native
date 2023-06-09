import { IButtonProps } from "native-base";

export const ContainerStyles = {
  alignItems: 'center',
  paddingTop: '10px',
  height: 'full',
  fontFamily: 'default',
  fontWeight: 400,
};

export const BackBoxStyle = {
  w: "95%", 
  mt: 4, 
  mb: 2, 
  alignItems: "flex-start",
}

export const InputStyles = {
  variant:"rounded",
  paddingLeft: 23,
  paddingRight: 23,
  width: 300,
  height: 47,
  fontSize: 16,
  color: 'gray.800',
  borderWidth: 0,
  _selectedItem: { bg: "teal.600" },
  _dark: {
    bg: 'gray.50',
    _hover: {
      bg: 'gray.50',
    },
    _focus: {
      bg: 'gray.50',
    },
  },
  _light: {
    bg: 'gray.50',
    _hover: {
      bg: 'gray.50',
    },
    _focus: {
      bg: 'gray.50',
    },
  },
};

export const ButtonStyles: IButtonProps = {
  bg: 'primary.800',
  width: '140px',
  height: '40px',
  borderRadius: '50px',
  alignSelf: 'center',
  fontSize: 16,
  flexDir: 'row',
  fontWeight: 600,
  mt: 6,
  mb: 10
};