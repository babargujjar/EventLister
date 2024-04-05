import { ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const useMyPosting = () => {
  const user = auth().currentUser?.uid;
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsRef = firestore().collection('events');
        const snapshot = await eventsRef
          .where('EventAdminUid', '==', user)
          .get();
        if (snapshot.empty) {
          ToastAndroid.show('You havent created any events yet. Get started by creating yourfirst event!',ToastAndroid.LONG);
          return;
        }
        const eventsData: any = [];
        snapshot.forEach(doc => {
          eventsData.push({id: doc.id, ...doc.data()});
        });
        setUserEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [user]);




  return{
    userEvents,
    loading,
  }
}

export default useMyPosting