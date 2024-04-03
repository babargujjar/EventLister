import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import search from '../../../assets/images/Search.png';
import Card from '../../../components/card/Card';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MyPosting = ({navigation}: any) => {
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

  const renderEventCard = ({item}: any) => {
    return (
      userEvents? 
      (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('EventDetail', {event: item});
        }}>
        <Card param={item} />
      </TouchableOpacity>
      ):
      (
      <Text style={Style.message}>
            You haven't created any events yet. Get started by creating your
            first event!
          </Text>
          )
    );
  };

  return (
    <FlatList
      data={userEvents}
      ListHeaderComponent={() => (
        <View style={Style.container2}>
          <Text style={Style.heading}>My Event Postings</Text>
          <View style={Style.inputview}>
            <Image style={{height: 24, width: 24}} source={search} />
            <Text style={{color: '#171B2E'}}>search...</Text>
          </View>
        </View>
      )}
      renderItem={renderEventCard}
      // keyExtractor={item => item.id}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            color="#6F3DE9"
            style={{marginTop: 20}}
          />
        ) : null
      }
      contentContainerStyle={Style.container}
    />
  );
};

export default MyPosting;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    // height:"100%"
  },
  container2: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20, // Add padding bottom to avoid cut-off content
  },
  heading: {
    color: '#171B2E',
    marginTop: 32,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  inputview: {
    height: 52,
    borderRadius: 26,
    borderColor: '#EAEAED',
    borderWidth: 1,
    marginTop: 43,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    paddingLeft: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
