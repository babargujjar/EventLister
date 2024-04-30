import {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {CardProps} from '../constant/types';
import storage from '@react-native-firebase/storage';
import {useAppDispatch} from './hooks';
import auth from '@react-native-firebase/auth';
import {editEvent} from '../store/slice/EventsSlice';

const options = [
  'Exhibition',
  'Workshop',
  'Conference',
  'Festival',
  'Game',
  'Premiere',
  'Concert',
];

const useEditEvent = ({param}: CardProps) => {
  const [eventName, setEventName] = useState('');
  const [price, setPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [optionModel, setOptionModel] = useState(false);
  const [eventMapURL, setEventMapURL] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [loading, setLoading] = useState(false);
    const adminName = auth().currentUser?.displayName;
    const adminPhoto = auth().currentUser?.photoURL;
    const adminUid = auth().currentUser?.uid;
  const dispatch = useAppDispatch();
  const id = param.id;

  useEffect(() => {
    setEventName(param.EventName);
    setPrice(param.EventPrice);
    setEventDate(param.EventDate);
    setEventLocation(param.EventLocation);
    setEventType(param.EventType);
    setEventMapURL(param.EventMapURL);
    setImageURI(param.EventImage);
  }, [param]);

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
    setLoading(true);
     let imageURII = imageURI;

     let eventImageURL = '';

     if (imageURII.startsWith('file://')) {
       eventImageURL = await uploadImageToStorageAndGetDownloadURL(imageURII);
     } else if (imageURI) {
       eventImageURL = imageURI;
     }
    const eventData = {
      eventName,
      price,
      eventDate,
      eventLocation,
      eventMapURL,
      eventImageURL,
      eventType,
      id,
      adminName,
      adminPhoto,
      adminUid,
    };
    await dispatch(editEvent({eventData}));
    setEventName('');
    setPrice('');
    setEventDate('');
    setEventLocation('');
    setEventType('');
    setEventMapURL('');
    setImageURI('');
    setLoading(false);
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
    optionModel,
    setOptionModel,
    options,
    imageURI,
    handleEditEvent,
    loading,
    setLoading,
  };
};

export default useEditEvent;
