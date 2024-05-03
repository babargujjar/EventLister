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
      setUserEvents([...data]as any);
    } else {
      setUserEvents([]); 
    }
  }, [data]);


  return{
    userEvents,
    loading,
  }
}

export default useMyPosting