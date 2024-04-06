import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import firestore from "@react-native-firebase/firestore"
import storage from '@react-native-firebase/storage';


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

// useEffect(() => {
//   const fetchEvents = async () => {
//     try {
//       const eventsRef = firestore().collection('events');
//       const snapshot = await eventsRef.get();
//       const eventData: any = [];

//       await Promise.all(snapshot.docs.map(async (doc) => {
//         const event = doc.data() ;
//         if (event.EventImage && (event.EventImage.startsWith('gs://') || event.EventImage.startsWith('https://'))) {
//           event.EventImageURL = event.EventImage;
//         } else {
//           // Check if image exists in storage
//           const imageRef = storage().ref().child(event.EventImage);
//           const exists = await imageRef.getMetadata().then(() => true).catch(() => false);
//           if (exists) {
//             const downloadURL = await imageRef.getDownloadURL();
//             event.EventImageURL = downloadURL;
//           } else {
//             console.error(`Image not found at path: ${event.EventImage}`);
//           }
//         }
//         eventData.push({ id: doc.id, ...event });
//       }));

//       setEvents(eventData);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   fetchEvents();
// }, []);

useEffect(() => {
  const eventsRef = firestore().collection('events');

  const unsubscribe = eventsRef.onSnapshot(snapshot => {
    const eventData: any = [];

    snapshot.forEach(doc => {
      const event = doc.data();
      if (event.EventImage && (event.EventImage.startsWith('gs://') || event.EventImage.startsWith('https://'))) {
        event.EventImageURL = event.EventImage;
      } else {
        // Check if image exists in storage
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