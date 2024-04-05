import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import firestore from "@react-native-firebase/firestore"



const useHome = () => {

  const [events, setEvents] = useState<any>([]);
  const [sortedEvents, setSortedEvents] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [values, setValues] = useState([0, 5000]);
  const [eventType, setEventType] = useState('');
  const [optionModel, setOptionModel] = useState(false);

  const handleValuesChange = (newValues: number[]) => {
    setValues(newValues);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = firestore().collection('events');
        const snapshot = await eventsRef.get();
        const eventData: any = [];
        snapshot.forEach(doc => {
          eventData.push({id: doc.id, ...doc.data()});
        });
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
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
    events.sort((a: any, b: any) => new Date(b.date) as any - new Date(a.date));
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