import { ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import { useAppDispatch, useAppSelector } from './hooks'
import { myEvents } from '../store/slice/EventsSlice'



const useMyPosting = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch()
  const data = useAppSelector(state=>state.myevents.event)
  const currentuser = auth().currentUser
  // console.log('data', data)


  useEffect(() => {
    const fetchMyEvents = async () => {
      if (currentuser) {
        setLoading(true);
        try {
          await dispatch(myEvents(currentuser.uid));
        } catch (error) {
          console.error('Error fetching user events:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMyEvents();
  }, [dispatch, currentuser]);

  useEffect(() => {
    if (Array.isArray(data)) {
      // Check if events is an array
      setUserEvents([...data]as any);
    } else {
      setUserEvents([]); // If events is not an array, set an empty array
    }
  }, [data]);



//   useEffect(() => {
//   const eventsRef = firestore().collection('events').where('EventAdminUid', '==', user);

//   const unsubscribe = eventsRef.onSnapshot(snapshot => {
//     setLoading(true);
//     if (snapshot.empty) {
//       ToastAndroid.show('You haven\'t created any events yet. Get started by creating your first event!', ToastAndroid.LONG);
//       setLoading(false);
//       return;
//     }

//     const eventsData: any = [];
//     snapshot.forEach(doc => {
//       eventsData.push({ id: doc.id, ...doc.data() });
//     });
//     setUserEvents(eventsData);
//     setLoading(false);
//   }, error => {
//     console.error('Error fetching events: ', error);
//     setLoading(false);
//   });

//   return () => unsubscribe();
// }, [user]);



  return{
    userEvents,
    loading,
  }
}

export default useMyPosting