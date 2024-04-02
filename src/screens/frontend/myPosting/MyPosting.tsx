// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import search from '../../../assets/images/Search.png';
// import concert from '../../assets/images/concert.jpeg';
// import Card from '../../../components/card/Card';
// import auth from "@react-native-firebase/auth"
// import firestore from "@react-native-firebase/firestore"

// const MyPosting = ({navigation}: any) => {
//    const user = auth().currentUser?.uid
//    const [userEvents, setUserEvents] = useState([]);
//    const [loading,setLoading] = useState(true)

//    useEffect(() => {

//      const fetchEvents = async () => {
//       setLoading(true)
//        try {
//          const eventsRef = firestore().collection('events');
//          const snapshot = await eventsRef
//            .where('EventAdminUid', '==', user)
//            .get();

//          if (snapshot.empty) {
//            console.log('No matching events found');
//            return;
//          }

//          const eventsData:any = [];
//          snapshot.forEach(doc => {
//            eventsData.push({id: doc.id, ...doc.data()});
//          });
//          setUserEvents(eventsData);
//        } catch (error) {
//          console.error('Error fetching events: ', error);
//        }
//        setLoading(false)
//      };

//      fetchEvents();
//    }, [user]);
//    console.log('userEvents', userEvents)

//      const renderEventCard = ({item}: any) => {
//        return (
//          <TouchableOpacity
//            activeOpacity={0.7}
//            onPress={() => {
//              navigation.navigate('EventDetail', {event: item});
//            }}>
//            <Card param={item} />
//          </TouchableOpacity>
//        );
//      };

//   return (
//     <FlatList
//       data={[1]}
//       renderItem={() => {
//         <View style={Style.container}>
//           <Text style={Style.heading}>My Event Postings</Text>
//           <View style={Style.inputview}>
//             <Image style={{height: 24, width: 24}} source={search} />
//             <Text style={{color: '#171B2E'}}>search...</Text>
//           </View>
//           <FlatList
//             data={userEvents}
//             renderItem={renderEventCard}
//             // keyExtractor={item => item.uid}
//           />
//         </View>;
//       }}
//       keyExtractor={(item, index) => index.toString()}
//     />
//   );
// };

// export default MyPosting;

// const Style = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//   },
//   heading: {
//     color: '#171B2E',
//     marginTop: 32,
//     fontSize: 22,
//     fontWeight: '600',
//     lineHeight: 28,
//   },
//   inputview: {
//     height: 52,
//     borderRadius: 26,
//     borderColor: '#EAEAED',
//     borderWidth: 1,
//     marginTop: 43,
//     backgroundColor: '#FFFFFF',
//     flex: 1,
//     flexDirection: 'row',
//     marginBottom: 5,
//     alignItems: 'center',
//     paddingLeft: 16,
//   },
// });

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
          console.log('No matching events found');
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
  // console.log('userEvents', userEvents);

  const renderEventCard = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('EventDetail', {event: item});
        }}>
        <Card param={item} />
      </TouchableOpacity>
    );
  };

  return (
    // <View style={Style.container}>
    //   <Text style={Style.heading}>My Event Postings</Text>
    //   <View style={Style.inputview}>
    //     <Image style={{height: 24, width: 24}} source={search} />
    //     <Text style={{color: '#171B2E'}}>search...</Text>
    //   </View>
    //   {loading ? (
    //     <ActivityIndicator
    //       size="large"
    //       color="#6F3DE9"
    //       style={{marginTop: 20}}
    //     />
    //   ) : (
    //     <FlatList
    //       data={userEvents}
    //       renderItem={renderEventCard}
    //       // keyExtractor={item => item.id}
    //     />
    //   )}
    // </View>
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
});
