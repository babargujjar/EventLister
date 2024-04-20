import  {launchImageLibrary} from "react-native-image-picker"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { useState } from "react";
import { ToastAndroid } from "react-native";
import storage from "@react-native-firebase/storage"



  const options = [
    'Exhibition',
    'Workshop',
    'Conference',
    'Festival',
    'Game',
    'Premiere',
    'Concert',
    ];


const useCreateEvent = () => {
  const [eventName,setEventName] = useState("")
  const [price,setPrice] = useState("")
  const [eventDate,setEventDate] = useState("")
  const [eventLocation,setEventLocation] = useState("")
  const [eventType,setEventType] = useState("")
  const [optionModel,setOptionModel] = useState(false)
  const [eventMapURL,setEventMapURL] = useState("")
  const [participate,setParticipate] = useState(0)
  const [imageURI, setImageURI] = useState('');
  const [loading,setLoading] = useState(false)
  const  adminName = auth().currentUser?.displayName
  const  adminPhoto = auth().currentUser?.photoURL
  const  adminUid = auth().currentUser?.uid
  
  const uploadImageToStorageAndGetDownloadURL = async (
  imageURII: string,
): Promise<string> => {
  try {
    const response = await fetch(imageURII);
    const blob = await response.blob();
    const imageName = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const imageRef = storage().ref(`event_images/${imageName}`);
    await imageRef.put(blob);
    const downloadURL = await imageRef.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
};


const Event = async () => {
    try {
       if (
      !eventName ||
      !price ||
      !eventDate ||
      !eventLocation ||
      !eventMapURL ||
      !imageURI ||
      !eventType
    ) {
      ToastAndroid.show('Please Enter all fields', ToastAndroid.SHORT);
      return;
    }
    setLoading(true)

      let imageURII = imageURI;
      let eventImageURL = '';
      if (imageURII.startsWith('file://')) {
      eventImageURL = await uploadImageToStorageAndGetDownloadURL(
          imageURII,
        );
      }

      await firestore().collection('events').add({
        EventName: eventName,
        EventPrice: price,
        EventDate: eventDate,
        EventLocation: eventLocation,
        EventMapURL: eventMapURL,
        EventImage:eventImageURL,
        EventAdminUid: adminUid,
        EventAdminName:adminName,
        EventAdminPhoto: adminPhoto,
        EventParticipate:participate,
        EventType:eventType

      });
 setLoading(false)
      ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
      setEventDate('');
      setImageURI('');
      setEventLocation('');
      setEventMapURL('');
      setPrice('');
      setEventName('');
      setEventType("")
    } catch (error: any) {
      console.error('Error creating event:', error);
      ToastAndroid.show('Error creating event', ToastAndroid.SHORT);
    }
  



};

    const handleSelectImage = () => {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          const {uri} = response.assets[0];
          if (uri) {
            setImageURI(uri);
          }
        }
      });
    };
  return {
    eventDate,
    setEventDate,
    eventLocation,
    setEventLocation,
    eventMapURL,
    setEventMapURL,
    eventName,
    setEventName,
    eventType,
    setEventType,
    price,
    setPrice,
    handleSelectImage,
    Event,
    optionModel,
    setOptionModel,
    participate,
    setParticipate,
     options,
  imageURI,
  setImageURI,
  loading,
  setLoading
  }
}

export default useCreateEvent