import { Button, Modal, Pressable, Text } from "native-base";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useState } from "react";

interface SelectImageInputProps{
  setImageAssets: React.Dispatch<React.SetStateAction<ImagePickerResponse>>;
  children: JSX.Element;
}

function SelectImageIcon({ name }: { name: string }){
  return (
    <FontAwesomeIcons
      name={name}
      color="#EDEFF1"
      size={25}
      style={{ marginRight: 20 }}
    />
  );
}

export default function SelectImageInput({ setImageAssets, children } : SelectImageInputProps){
  const [modalVisible, setModalVisible] = useState(false);

  const getImageFromGallery = () => {
    launchImageLibrary(
      {mediaType: "photo"}, 
      (assets)=>{
        setImageAssets(assets);
      }
    )
  }

  const getImageFromCamera = () => {
    launchCamera(
      {mediaType: "photo"}, 
      (assets)=>{
        setImageAssets(assets);
      }
    )
  }

  return (
    <>
      <Pressable width={"100%"} alignItems={"center"} onPress={() => { setModalVisible(!modalVisible) }}>  
        {children}
      </Pressable>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} >
        <Modal.Content bgColor={"gray.800"} borderRadius={20}>
          <Modal.Body alignItems="flex-start" paddingLeft="25%">
            <Button 
              variant="ghost" 
              leftIcon={ <SelectImageIcon name={"camera"} /> }
              onPress={() => {
                setModalVisible(!modalVisible);
                getImageFromCamera();
              }}
            >
              <Text fontSize={20}>Câmera</Text>
            </Button>
            <Button 
              variant="ghost" 
              leftIcon={ <SelectImageIcon name={"image"} /> }
              onPress={() => {
                setModalVisible(!modalVisible);
                getImageFromGallery();
              }}
            >
              <Text fontSize={20}>Galeria</Text>
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}