export const RegularTextStyles = {
  color: "secondary.default", 
  fontSize:"md",
  fontWeight: 400,
  fontFamily: "default",
  lineHeight: "md",
  mt: 2,
}

export const BackBoxStyle = {
  w: "90%", 
  mt: 4, 
  mb: 2, 
  alignItems: "flex-start",
}

export const UserNameTextStyles = {
  color: "gray.50", 
  fontSize:"xl",
  fontWeight: 700,
  fontFamily: "default",
  lineHeight: "xs",
}

export const TitleTextStyles = {
  color: "secondary.default", 
  fontSize:"md",
  fontWeight: 700,
  fontFamily: "default",
  mt: 3,
}

export const SmallTextStyle = {
  color: "secondary.default",
  fontSize: "xs",
  fontWeight: 600, 
  fontFamily: "default",
}

export const HStackStyle = {
  w: "85%",
  minH: "60px", 
  bgColor: "primary.500", 
  borderRadius: 50,
  alignItems: "center",
  p: 2,
  mb: "30px",
}

export const AvatarStyles = {
  mr: 4, 
  alignSelf: "center",
  size: "md"
}

export const MainVStackStyle = {
  bgColor: "primary.default",
  w: "90%",
  borderRadius: 20,
}

export const getImageStyles = (width: number) => {
  return { 
    borderTopRightRadius: 20, 
    borderTopLeftRadius: 20, 
    height: width*0.85, 
    width: width 
  }
}