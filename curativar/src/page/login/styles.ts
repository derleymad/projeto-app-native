import {IButtonProps, ITextProps} from 'native-base';

export const ContainerStyles = {
  alignItems: 'center',
  paddingTop: '94px',
  height: 'full',
  fontFamily: 'default',
  fontWeight: 400,
};

export const InputStyles = {
  variant: 'rounded',
  width: 300,
  height: 47,
  fontSize: 16,
  color: 'gray.800',
  borderWidth: 0,
  _dark: {
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
  width: '124px',
  height: '40px',
  borderRadius: '50px',
  alignSelf: 'center',
  fontSize: 16,
  flexDir: 'row',
  fontWeight: 600,
};

export const AnchorButtonStyle: IButtonProps = {
  bg: 'transparent',
  _pressed: {
    bg: 'transparent',
  },
};

export const AnchorTextStyle = (isUnderline = false): ITextProps => ({
  color: 'secondary.default',
  textDecorationLine: isUnderline ? 'underline' : 'none',
  fontWeight: isUnderline ? 500 : 400,
  fontSize: 16,
});
