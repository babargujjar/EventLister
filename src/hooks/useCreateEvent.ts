import  {launchImageLibrary} from "react-native-image-picker"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { useState } from "react";
import { ToastAndroid } from "react-native";



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
  const  adminName = auth().currentUser?.displayName
  const  adminPhoto = auth().currentUser?.photoURL
  const  adminUid = auth().currentUser?.uid



const Event = async () => {
  try {
    const eventData = {
      eventName,
      price,
      eventDate,
      eventLocation,
      eventMapURL,
      imageURI,
      participate,
      eventType,
      createdBy: {
        adminName,
        adminUid,
        adminPhoto,
      },
    };

    if (
      !eventData.eventName ||
      !eventData.price ||
      !eventData.eventDate ||
      !eventData.eventLocation ||
      !eventData.eventMapURL ||
      !eventData.imageURI ||
      !eventData.createdBy.adminName ||
      !eventData.createdBy.adminUid ||
      // !eventData.createdBy.adminPhoto ||
      !eventData.eventType
    ) {
      ToastAndroid.show('Please Enter all fields', ToastAndroid.SHORT);
      return; 
    }

    
    await firestore().collection('events').add({
      EventName: eventData.eventName,
      EventPrice: eventData.price,
      EventDate: eventData.eventDate,
      EventLocation: eventData.eventLocation,
      EventMapURL: eventData.eventMapURL,
      EventImage: eventData.imageURI,
      EventAdminUid: eventData.createdBy.adminUid,
      EventAdminName: eventData.createdBy.adminName,
      EventAdminPhoto: eventData.createdBy.adminPhoto,
      EventParticipates:eventData.participate,
      EventType:eventData.eventType
    });

    ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
        setEventName('');
        setPrice('');
        setEventDate('');
        setEventLocation('');
        setEventType('');
        setEventMapURL('');
        setImageURI('');
        setOptionModel(false);
  } catch (error) {
    console.error('Error creating event', error);
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
  setImageURI
  }
}

export default useCreateEvent