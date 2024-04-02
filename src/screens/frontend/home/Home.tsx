import {View, Text, ScrollView, Image, StyleSheet, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import filter from '../../../assets/images/Filter.png';
import search from '../../../assets/images/Search.png';
import concert from '../../../assets/images/concert.jpeg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../../components/card/Card';
import firestore from "@react-native-firebase/firestore"

const Home = ({navigation}:any) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = firestore().collection('events');
        const snapshot = await eventsRef.get();
        const eventData: any = [];
        snapshot.forEach(doc => {
          eventData.push({id: doc.id, ...doc.data()});
        });
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Assume eventsArray is an array of event objects with a 'date' property

  function findMostRecentEvent(events: any) {
    if (!events || events.length === 0) {
      return null; // If array is empty or undefined, return null
    }

    // Sort eventsArray based on date in descending order (most recent first)
    events.sort((a:any, b:any) => new Date(b.date) - new Date(a.date));

    // Return the first element of sorted array (most recent event)
    return events[0];
  }

  // Usage example:
  const recentEvent = findMostRecentEvent(events);
  console.log('Most recent event:', recentEvent);
  const recentimg = {uri: recentEvent?.EventAdminPhoto};
  const recenteventimg = {uri: recentEvent?.EventImage};

  return (
    <FlatList
      data={[1]} // Dummy data for FlatList
      renderItem={() => (
        <View style={Style.container}>
          <View style={{marginHorizontal: 20}}>
            <View style={Style.resent}>
              <Text style={Style.resenttext}>Recent Events</Text>
              <View
                style={{
                  width: 42,
                  height: 42,
                  padding: 10,
                  // elevation: 4,
                  borderWidth: 1,
                  borderRadius: 100,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: '#EFF0F9',
                }}>
                <Image style={Style.resentimg} source={filter} />
              </View>
            </View>
            <View style={Style.inputview}>
              <Image style={{height: 24, width: 24}} source={search} />
              <Text style={{color: '#171B2E'}}>search...</Text>
            </View>
            <View style={Style.ongoing}>
              <Text style={Style.ongoingtext}>On Going Events</Text>
              <Text style={Style.ongoingtext2}>see all</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EventDetail', {param: recentEvent})}
              style={Style.mianview}>
              <View style={Style.imgview}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                    position: 'relative',
                  }}
                  source={recentEvent? recenteventimg : concert}
                />
                <Text style={Style.mainimgbotton}>Concert</Text>
                <View style={Style.mainviewtext}>
                  <View style={Style.operview}>
                    <View>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: '600',
                          fontSize: 14,
                          lineHeight: 18,
                          color: '#171B2E',

                          // marginBottom: 8,
                        }}>
                        {recentEvent? recentEvent?.EventName : "Loading...."}
                      </Text>
                      <View
                        style={{
                          height: 19,
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          // borderWidth: 1,
                          // borderColor: 'red',
                        }}>
                        <Image
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 100,
                            marginRight: 7,
                          }}
                          source={recentEvent? recentimg : concert}
                        />
                        <Text
                          style={{
                            height: 19,
                            color: '#171B2E',
                            fontSize: 12,
                            fontWeight: '400',
                          }}>
                          {recentEvent? recentEvent.EventAdminName : "Loading...."}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        backgroundColor: '#EFF0F9',
                        height: 32,
                        width: 50,
                        borderRadius: 40,
                        color: '#6F3DE9',
                        textAlign: 'center',
                        padding: 5,
                      }}>
                      {recentEvent? recentEvent.EventPrice : "Loading.."}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#171B2E',
                      borderTopWidth: 1,
                      borderColor: '#EFF0F9',
                      paddingTop: 10,
                    }}>
                    {recentEvent? recentEvent.EventDate : "Loading.."}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={Style.ongoing}>
              <Text style={Style.ongoingtext}>Other Event</Text>
              <Text style={Style.ongoingtext2}>see all</Text>
            </View>
            <FlatList
              data={events}
              // keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('EventDetail', {param: item});
                  }}>
                  <Card param={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Home;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    color: '#171B2E',
    flexGrow: 1,
    width: '100%'
  },
  resent: {
    color: '#171B2E',
    marginTop: 32,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    flexDirection: 'row',
    // width: 335,
  },
  resentimg: {
    width: 22,
    height: 22,
  },
  resenttext: {
    color: '#171B2E',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
  inputview: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    // borderColor: '#FFFFFF',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    paddingLeft: 16,
  },
  ongoing: {
    height: 23,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ongoingtext: {
    color: '#171B2E',
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '600',
  },
  ongoingtext2: {
    color: '#6F3DE9',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    height: 18,
    width: 47,
  },
  mainimgbotton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    height: 32,
    width: 73,
    paddingHorizontal: 12,
    paddingVertical: 7,
    color: '#171B2E',
    borderRadius: 40,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
    textAlign: 'center',
  },
  mianview: {
    height: 294,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    //  borderWidth:1,
    //  borderColor:'red',
    elevation: 4,
    marginHorizontal: 5,
    padding: 6,
    marginBottom: 30,
  },
  imgview: {
    height: 160,
  },
  mainviewtext: {
    height: 96,
    margin: 16,
  },
  operview: {
    height: 45,
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

});
