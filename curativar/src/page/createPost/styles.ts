import { IButtonProps, IInputProps, ISelectProps, ITextProps } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { IconProps } from "react-native-vector-icons/Icon";

type TStylesProps = {
  box: InterfaceBoxProps,
  inputsContainer: InterfaceBoxProps,
  h1: ITextProps,
  h2: ITextProps,
  imageInput: InterfaceBoxProps,
  imageIcon: IconProps,
  addButton: InterfaceBoxProps,
  addIcon: IconProps,
  area: any,
  input: IInputProps,
  select: ISelectProps,
  containerBottom: any,
  submitBtn: IButtonProps,
}

const Styles: TStylesProps = {
  box: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '74px',
    paddingLeft: '22px',
    paddingRight: '22px',
    paddingBottom: '20px',
    height: 'full',
  },
  h1: {
    fontFamily: 'default',
    fontWeight: '700',
    fontSize: 32,
  },
  h2: {
    fontFamily: 'default',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 5,
    marginTop: 10,
  },
  imageInput: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: 'gray.300',
    width: "100%",
    height: 277,
    marginTop: '24px',
    position: 'relative',
  },
  imageIcon: {
    name: 'image-search',
    color: 'rgba(17,17,17,0.13)',
    size: 108,
  },
  addButton: {
    position: 'absolute',
    bottom: "15px",
    right: "15px",
    backgroundColor: 'primary.default',
    width: 41,
    height: 41,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addIcon: {
    name: 'plus',
    size: 18,
  },
  area: {
    editable: true,
    multiline: true,
    numberOfLines: 5,
    height: 126,
    backgroundColor: 'gray.300',
    borderRadius: 20,
    marginTop: 26,
    placeholder: 'Descrição',
    color: 'gray.800',
    fontSize: "4rem",
  },
  input: {
    color: 'gray.800',
    backgroundColor: 'gray.300',
    borderRadius: 20,
    borderWidth: 0,
    marginBottom: 5,
    fontSize: "4rem"
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  select: {
    paddingLeft: 23,
    paddingRight: 23,
    color: 'gray.800',
    borderWidth: 0,
    bg: 'gray.300',
    fontSize: "4rem",
  },
  containerBottom: {
    width: '100%',
    alignItems: 'center',
    flexDir: 'row',
    gap: 7,
  },
  submitBtn: {
    color: 'gray.50',
    bg: 'primary.500',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: '50px',
    marginTop: 10,
  }
};

export default Styles;