import { Linking, ToastAndroid } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import images from "../assets/images/images.jpg"
import {CardProps } from "../constant/types";

const useEventDetail = ({param}:CardProps) => {
  const navigation = useNavigation<any>();

  const Accountimg = {uri: param?.EventAdminPhoto};
  const concertimg = {uri: param?.EventImage};

  const openMap = () => {
    Linking.openURL(param?.EventMapURL);
  };
  return {
    openMap,
    Accountimg,
    concertimg,
  }
}

export default useEventDetail