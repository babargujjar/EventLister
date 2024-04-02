import {View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image,Button, ToastAndroid} from 'react-native';
import React,{useState} from 'react';
import Upload from "../../../assets/images/Upload.png"
import  {launchImageLibrary, ImagePickerResponse} from "react-native-image-picker"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { useAppDispatch } from '../../../hooks/hooks';
import {UploadEvent} from '../../../store/createEventSlice';



const initialEvent: any = {
  eventName: '',
  eventPrice: 0,
  eventType: '',
  eventLocation: '',
  eventDate: new Date(),
  eventMapUrl: '',
  uid: '',
  eventImage: '',
  createdBy: {
    email: '',
    name: '',
    uid: '',
    photoURL: '',
  },
};

const CreateEvent = () => {

  const [eventName,setEventName] = useState("")
  const [price,setPrice] = useState("")
  const [eventDate,setEventDate] = useState("")
  const [eventLocation,setEventLocation] = useState("")
  const [eventMapURL,setEventMapURL] = useState("")
  const [imageURI, setImageURI] = useState('');
  const  adminName = auth().currentUser?.displayName
  const  adminPhoto = auth().currentUser?.photoURL
  const  adminUid = auth().currentUser?.uid


const Event = async () => {
  try {
    const eventData = {
      eventName,
      price,
      eventDate,
      eventLocation,
      eventMapURL,
      imageURI,
      createdBy: {
        adminName,
        adminUid,
        adminPhoto,
      },
    };

    // Validate all fields
    if (
      !eventData.eventName ||
      !eventData.price ||
      !eventData.eventDate ||
      !eventData.eventLocation ||
      !eventData.eventMapURL ||
      !eventData.imageURI ||
      !eventData.createdBy.adminName ||
      !eventData.createdBy.adminUid ||
      !eventData.createdBy.adminPhoto
    ) {
      ToastAndroid.show('Please Enter all fields', ToastAndroid.SHORT);
      return; 
    }

    
    await firestore().collection('events').add({
      EventName: eventData.eventName,
      EventPrice: eventData.price,
      EventDate: eventData.eventDate,
      EventLocation: eventData.eventLocation,
      EventMapURL: eventData.eventMapURL,
      EventImage: eventData.imageURI,
      EventAdminUid: eventData.createdBy.adminUid,
      EventAdminName: eventData.createdBy.adminName,
      EventAdminPhoto: eventData.createdBy.adminPhoto,
    });

    ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
    ()=>{initialEvent()}
  } catch (error) {
    console.error('Error creating event', error);
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

  return (
    <ScrollView>
      <View style={Style.container}>
        <View>
          <Text style={Style.heading}>CreateEvent</Text>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Event Name</Text>
            <View>
              <TextInput
                style={Style.input}
                placeholder="Enter Name"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                value={eventName}
                onChangeText={value => setEventName(value)}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Price</Text>
            <View>
              <TextInput
                style={Style.input}
                onChangeText={value => setPrice(value)}
                value={price}
                placeholder="$ 0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#171B2E"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Event Date</Text>
            <View>
              <TextInput
                style={Style.input}
                onChangeText={value => setEventDate(value)}
                value={eventDate}
                placeholder="Enter Event Date (dd Month yyyy)"
                keyboardType="default"
                placeholderTextColor="#171B2E"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Event Location</Text>
            <View>
              <TextInput
                style={Style.input}
                onChangeText={value => setEventLocation(value)}
                value={eventLocation}
                placeholder="Event Location"
                keyboardType="default"
                placeholderTextColor="#171B2E"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Event Map Location URL</Text>
            <View>
              <TextInput
                style={Style.input}
                onChangeText={value => setEventMapURL(value)}
                value={eventMapURL}
                placeholder="URL"
                keyboardType="url"
                placeholderTextColor="#171B2E"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={Style.nametext}>Event Media</Text>
          <TouchableOpacity onPress={handleSelectImage} style={Style.inputimg}>
            {imageURI ? (
              <Image
                style={{zIndex: 999, height: '100%', width: '100%'}}
                source={{uri: imageURI}}
              />
            ) : (
              <>
                <Image style={Style.upload} source={Upload} />
                <Text
                  style={{color: '#171B2E', fontSize: 14, fontWeight: '600'}}>
                  Upload Image
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={Event} style={Style.botton}>
          <Text style={Style.bottontext}>Publish Events</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


export default CreateEvent;



const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  heading: {
    color: '#171B2E',
    marginVertical: 32,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
  },
  inputview: {
    height: 82,
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    height: 52,
    color: '#171B2E',
    borderRadius: 26,
    backgroundColor: '#F9F9F9',
    paddingLeft: 16,
  },
  nametext: {
    color: '#171B2E',
    height: 18,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  botton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#6F3DE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 33,
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  inputimg: {
    height: 161,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#171B2E',
    marginTop:12,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden'
    // backgroundColor:'#F9F9F9'
  },
  upload:{
    width:48,
    height:48
  }
});


