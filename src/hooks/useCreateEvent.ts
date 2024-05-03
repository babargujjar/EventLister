import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import storage from '@react-native-firebase/storage';
import {useAppDispatch, useAppSelector} from './hooks';
import {createEvent, fetchEvents} from '../store/slice/EventsSlice';
import useHome from './useHome';

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
  const {setEvents} = useHome()
  const dispatch = useAppDispatch();
  const [eventName, setEventName] = useState('');
  const [price, setPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [optionModel, setOptionModel] = useState(false);
  const [eventMapURL, setEventMapURL] = useState('');
  const [participate, setParticipate] = useState(0);
  const [imageURI, setImageURI] = useState('');
  const [loading, setLoading] = useState(false);
  const adminName = auth().currentUser?.displayName;
  const adminPhoto = auth().currentUser?.photoURL;
  const adminUid = auth().currentUser?.uid;

useEffect(() => {
  const fetchData = async () => {
    await dispatch(fetchEvents());
  };
  fetchData();
}, [dispatch]);

const Data = useAppSelector(state => state.events.events);
 
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

  const handleCrateEvent = async () => {
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
      setLoading(true);

      let imageURII = imageURI;

      let eventImageURL = '';

      if (imageURII.startsWith('file://')) {
        eventImageURL = await uploadImageToStorageAndGetDownloadURL(imageURII);
      }

      const eventData = {
        eventName,
        price,
        eventDate,
        eventLocation,
        eventMapURL,
        adminUid,
        adminName,
        adminPhoto,
        participate,
        eventType,
        eventImageURL,
      };


      await dispatch(createEvent(eventData as any));

      setLoading(false);
      ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
     setEvents([...Data]);
      setEventDate('');
      setImageURI('');
      setEventLocation('');
      setEventMapURL('');
      setPrice('');
      setEventName('');
      setEventType('');  
    } catch (error) {
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
    handleCrateEvent,
    optionModel,
    setOptionModel,
    participate,
    setParticipate,
    options,
    imageURI,
    setImageURI,
    loading,
    setLoading,
  };
};

export default useCreateEvent;
