import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#E9F7F2',
      100: '#BDE5DA',
      200: '#91D3C2',
      300: '#66C0AA',
      400: '#39AD94',
      500: '#00987F',
      600: '#00836B',
      700: '#006E58',
      800: '#005846',
      900: '#004335',
      default: '#47C9AD',
    },
    secondary: {
      50: '#F3F3F6',
      100: '#DBDCE5',
      200: '#C3C6D3',
      300: '#ACB0C0',
      400: '#969BAD',
      500: '#818699',
      600: '#6C7185',
      700: '#595E70',
      800: '#474B5A',
      900: '#363945',
      default: '#121827',
    },
    // Redefining only one shade, rest of the color will remain same.
    gray: {
      50: '#EDEFF1',
      300: '#D1D4DD',
      800: '#474B5A',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
  fontConfig: {
    Quicksand: {
      300: {
        normal: 'Quicksand-Light',
      },
      400: {
        normal: 'Quicksand-Regular',
      },
      500: {
        normal: 'Quicksand-Medium',
      },
      600: {
        normal: 'Quicksand-SemiBold',
      },
      700: {
        normal: 'Quicksand-Bold'
      }
    },
    Nunito: {
      900: {
        normal: 'Nunito-Black'
      }
    }
  },
  fonts: {
    default: 'Quicksand',
    logo: 'Nunito'
  }
});

export default theme;
