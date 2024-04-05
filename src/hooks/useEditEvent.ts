import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { CardProps} from "../constant/types";
import firestore from "@react-native-firebase/firestore"



const options = [
  'Exhibition',
  'Workshop',
  'Conference',
  'Festival',
  'Game',
  'Premiere',
  'Concert',
];

const useEditEvent = ({param}:CardProps) => {

  const [eventName, setEventName] = useState('');
  const [price, setPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [optionModel, setOptionModel] = useState(false);
  const [eventMapURL, setEventMapURL] = useState('');
  const [imageURI, setImageURI] = useState('');

  useEffect(() => {
    setEventName(param.EventName);
    setPrice(param.EventPrice);
    setEventDate(param.EventDate);
    setEventLocation(param.EventLocation);
    setEventType(param.EventType);
    setEventMapURL(param.EventMapURL);
    setImageURI(param.EventImage);
  }, [param]);

  const handleEditEvent = async () => {
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

    try {
      const updatedEventData = {
        EventName: eventName,
        EventPrice: price,
        EventDate: eventDate,
        EventLocation: eventLocation,
        EventMapURL: eventMapURL,
        EventImage: imageURI,
        EventType: eventType,
      };

      await firestore()
        .collection('events')
        .doc(param.id)
        .update(updatedEventData);
      ToastAndroid.show('Event updated successfully!', ToastAndroid.SHORT);
      setEventName('');
          setPrice('');
          setEventDate('');
          setEventLocation('');
          setEventType('');
          setEventMapURL('');
          setImageURI('');
          setOptionModel(false);
    } catch (error) {
      console.error('Error updating event', error);
      ToastAndroid.show('Error updating event please try again', ToastAndroid.SHORT);
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
    handleSelectImage,
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
  Event,
  optionModel,
  setOptionModel,
  options,
  imageURI,
    handleEditEvent
  }
  
}

export default useEditEvent