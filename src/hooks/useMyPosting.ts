import { ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const useMyPosting = () => {
  const user = auth().currentUser?.uid;
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const eventsRef = firestore().collection('events').where('EventAdminUid', '==', user);

  const unsubscribe = eventsRef.onSnapshot(snapshot => {
    setLoading(true);
    if (snapshot.empty) {
      ToastAndroid.show('You haven\'t created any events yet. Get started by creating your first event!', ToastAndroid.LONG);
      setLoading(false);
      return;
    }

    const eventsData: any = [];
    snapshot.forEach(doc => {
      eventsData.push({ id: doc.id, ...doc.data() });
    });
    setUserEvents(eventsData);
    setLoading(false);
  }, error => {
    console.error('Error fetching events: ', error);
    setLoading(false);
  });

  return () => unsubscribe();
}, [user]);





  return{
    userEvents,
    loading,
  }
}

export default useMyPosting