import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import firestore from "@react-native-firebase/firestore"
import storage from '@react-native-firebase/storage';
import { useAppDispatch,useAppSelector } from "./hooks";
import { fetchEvents } from "../store/slice/fetchEventsSlice";
import { Event, EventsArray } from "../constant/types";

const useHome = () => {

// const dispatch = useAppDispatch()
// const fetcheventsData = useAppSelector((state)=>{state.eventsData.events})
// useEffect(()=>{
// dispatch(fetchEvents())
// },[dispatch])

// console.log('fetcheventsData', fetcheventsData)



// useEffect(()=>{
//    setEvents(fetcheventsData);
//   },[fetcheventsData])
  
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [values, setValues] = useState([0, 5000]);
  const [eventType, setEventType] = useState('');
  const [optionModel, setOptionModel] = useState(false);

  const handleValuesChange = (newValues: number[]) => {
    setValues(newValues);
  };

useEffect(() => {
  const eventsRef = firestore().collection('events');

  const unsubscribe = eventsRef.onSnapshot(snapshot => {
    const eventData: any = [];

    snapshot.forEach(doc => {
      const event = doc.data();
      if (event.EventImage && (event.EventImage.startsWith('gs://') || event.EventImage.startsWith('https://'))) {
        event.EventImageURL = event.EventImage;
      } else {
        const imageRef = storage().ref().child(event.EventImage);
        imageRef.getDownloadURL()
          .then(downloadURL => {
            event.EventImageURL = downloadURL;
          })
          .catch(error => {
            console.error(`Error fetching image URL for event: ${doc.id}`, error);
          });
      }
      eventData.push({ id: doc.id, ...event });
    });

    setEvents(eventData);
  }, error => {
    console.error('Error fetching events:', error);
  });

  return () => unsubscribe();
}, []);


  const options = [
    'Exhibition',
    'Workshop',
    'Conference',
    'Festival',
    'Game',
    'Premiere',
    'Concert',
  ];

  const filterEvent = () => {
    if (!eventDate || !values || !eventType) {
      ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
      return;
    }
    try {
      const filteredEvents = events.filter((event:any) => {
          return (
            event.EventPrice >= values[0] &&
            event.EventPrice <= values[1] &&
            event.EventType === eventType &&
            event.EventDate === eventDate
          );
        },
      );
      
      setSortedEvents(filteredEvents);
      setEventDate('');
      setEventType('');
      setValues([0, 5000]);
      setModalVisible(false);
    } catch (error) {
      ToastAndroid.show('No Have Related Data To Show', ToastAndroid.SHORT);
      console.error('Error filtering events:', error);
    }
  };

  function findMostRecentEvent(events: any[]) {
    if (!events || events.length === 0) {
      return null;
    }
    events.sort((a, b) => new Date(b.date) as any - new Date(a.date));
    return events[0];
  }
  

  const recentEvent = findMostRecentEvent(events);
  const recentimg = {uri: recentEvent?.EventAdminPhoto};
  const recenteventimg = {uri: recentEvent?.EventImage};

  
  return {
   recenteventimg,
   recentimg,
   filterEvent,
   options,
   handleValuesChange,
   eventDate,
   optionModel,
   sortedEvents,
   events,
   modalVisible,
   setModalVisible,
   recentEvent,
   values,
   setEventDate,
   setEventType,
   setEvents,
   setOptionModel,
   eventType
  }
}

export default useHome