import { Linking, ToastAndroid } from "react-native";
import firestore from '@react-native-firebase/firestore';

const useEventDetail = ({navigation,route}:any) => {
    const {param} = route.params;

      const Accountimg = {uri: param?.EventAdminPhoto};
  const concertimg = {uri: param?.EventImage};

  const addParticipate = async () => {
    try {
      try {
        const eventRef = firestore().collection('events').doc(param.id);
        await eventRef.update({
          EventParticipates: param?.EventParticipates + 1,
        });
        ToastAndroid.show('Ticket Buy Successfully!', ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show('Somthing Went wrong', ToastAndroid.SHORT);
      }
      navigation.navigate('TicketDetail', {param: param});
    } catch (error) {
      console.error('Error updating participation:', error);
    }
  };

  const openMap = () => {
    Linking.openURL(param?.EventMapURL);
  };
  return {
    openMap,
    addParticipate,
    Accountimg,
    concertimg,
  }
}

export default useEventDetail