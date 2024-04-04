import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import filter from '../../../assets/images/Filter.png';
import search from '../../../assets/images/Search.png';
import concert from '../../../assets/images/concert.jpeg';
import Card from '../../../components/card/Card';
import firestore from '@react-native-firebase/firestore';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Arrow from '../../../assets/images/ArrowRight.png';

const Home = ({navigation}: any) => {
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [values, setValues] = useState([0, 5000]);
  const [eventType, setEventType] = useState('');
  const [selectedValue, setSelectedValue] = useState('Select an option');
  const [optionModel, setOptionModel] = useState(false);

  const handleValuesChange = (newValues: number[]) => {
    setValues(newValues);
  };

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


  const options = [
    'Exhibition',
    'Workshop',
    'Conference',
    'Festival',
    'Game',
    'Premiere',
    'Concert',
  ];


  const filterEvent = () => {

    if (!eventDate || !values || !eventType) {
      ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
      return;
    }
    try {
      const filteredEvents = events.filter(event => {
        return (
          event.EventPrice >= values[0] &&
          event.EventPrice <= values[1] &&
          event.EventType === eventType &&
          event.EventDate === eventDate
        );
      });
      ToastAndroid.show("No Have Related Data To Show",ToastAndroid.SHORT)
      setSortedEvents(filteredEvents);
      setEventDate("")
      setEventType("")
      setValues([0,5000])
      setModalVisible(false);
    } catch (error) {
      console.error('Error filtering events:', error);
    }
  };


  function findMostRecentEvent(events: any) {

    if (!events || events.length === 0) {
      return null;
    }
    events.sort((a: any, b: any) => new Date(b.date) - new Date(a.date));
    return events[0];
  }

  
  const recentEvent = findMostRecentEvent(events);
  const recentimg = {uri: recentEvent?.EventAdminPhoto};
  const recenteventimg = {uri: recentEvent?.EventImage};

  const renderCustomMarker = (props: any) => (
    <>
      <View style={Style.customMarker}></View>
      <Text style={Style.markerText}>${props.currentValue}</Text>
    </>
  );

  return (
    <FlatList
      data={[1]}
      renderItem={() => (
        <View style={Style.container}>
          {sortedEvents.length > 0 ? (
            <View>
              <View style={{marginHorizontal: 20}}>
                <View style={Style.resent}>
                  <Text style={Style.resenttext}>Recent Events</Text>
                  <View style={Style.modalopacity}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image style={Style.resentimg} source={filter} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={Style.inputview}>
                  <Image style={{height: 24, width: 24}} source={search} />
                  <Text style={{color: '#171B2E'}}>search...</Text>
                </View>

                <FlatList
                  data={sortedEvents}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EventDetail', {param: item})
                      }
                      style={Style.mianview}>
                      <View style={Style.imgview}>
                        <Image
                          style={Style.eventimg}
                          source={{uri: item?.EventImage}}
                        />
                        <Text style={Style.mainimgbotton}>Concert</Text>
                        <View style={Style.mainviewtext}>
                          <View style={Style.operview}>
                            <View>
                              <Text style={Style.eventname}>
                                {item ? item?.EventName : 'Loading....'}
                              </Text>
                              <View style={Style.profileimg}>
                                <Image
                                  style={Style.adminpic}
                                  source={item.EventAdminPhoto}
                                />
                                <Text style={Style.adminname}>
                                  {item ? item.EventAdminName : 'Loading....'}
                                </Text>
                              </View>
                            </View>
                            <Text style={Style.eventprice}>
                              ${item ? item.EventPrice : 'Loading..'}
                            </Text>
                          </View>
                          <Text style={Style.eventdate}>
                            {item ? item.EventDate : 'Loading..'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          ) : (
            <FlatList
              data={[1]}
              renderItem={() => (
                <View>
                  <View style={{marginHorizontal: 20}}>
                    <View style={Style.resent}>
                      <Text style={Style.resenttext}>Recent Events</Text>

                      <View style={Style.modalopacity}>
                        <TouchableOpacity
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Image style={Style.resentimg} source={filter} />
                        </TouchableOpacity>
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
                      onPress={() =>
                        navigation.navigate('EventDetail', {param: recentEvent})
                      }
                      style={Style.mianview}>
                      <View style={Style.imgview}>
                        <Image
                          style={Style.eventpic}
                          source={recentEvent ? recenteventimg : concert}
                        />
                        <Text style={Style.mainimgbotton}>Concert</Text>
                        <View style={Style.mainviewtext}>
                          <View style={Style.operview}>
                            <View>
                              <Text
                                style={Style.eventname}>
                                {recentEvent ? recentEvent?.EventName: 'Loading....'}
                              </Text>
                              <View
                                style={Style.eventpicview}>
                                <Image
                                  style={Style.pic}
                                  source={recentEvent ? recentimg : concert}
                                />
                                <Text
                                  style={Style.imgpic}>
                                  {recentEvent
                                    ? recentEvent.EventAdminName
                                    : 'Loading....'}
                                </Text>
                              </View>
                            </View>
                            <Text
                              style={Style.eventprice}>${recentEvent ? recentEvent.EventPrice:'Loading..'}
                            </Text>
                          </View>
                          <Text
                            style={Style.eventdate}>
                            {recentEvent ? recentEvent.EventDate : 'Loading..'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={Style.ongoing}>
                      <Text style={Style.ongoingtext}>Other Event</Text>
                      <Text style={Style.ongoingtext2}>see all</Text>
                    </View>
                    <Modal
                      visible={modalVisible}
                      transparent={true}
                      animationType="slide"
                      onRequestClose={() => setModalVisible(false)}>
                      <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}>
                        <View style={Style.modalBackground}>
                          <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={Style.modalContent}>
                              <View style={Style.headingview}>
                                <Text style={Style.modelheading}>Filters</Text>
                                <Text
                                  style={Style.headingright}
                                  onPress={() => {
                                    setModalVisible(false);
                                  }}>
                                  reset
                                </Text>
                              </View>
                              <Text style={Style.pricerange}>Price Range</Text>
                              <View style={{marginTop: 10, marginBottom: 24}}>
                                <MultiSlider
                                  values={values}
                                  sliderLength={300}
                                  onValuesChange={handleValuesChange}
                                  min={0}
                                  max={5000}
                                  step={2}
                                  allowOverlap
                                  snapped
                                  selectedStyle={{
                                    backgroundColor: '#6F3DE9',
                                    height: 2,
                                  }}
                                  unselectedStyle={{
                                    backgroundColor: 'lightgray',
                                  }}
                                  containerStyle={{
                                    height: 30,
                                  }}
                                  customMarker={renderCustomMarker}
                                />
                                <View style={Style.hr} />
                              </View>
                              <View style={{position: 'relative'}}>
                                <View style={Style.inputviews}>
                                  <Text style={Style.nametext}>Event Date</Text>
                                  <View>
                                    <TextInput
                                      style={Style.input}
                                      onChangeText={value =>
                                        setEventDate(value)
                                      }
                                      value={eventDate}
                                      placeholder="Enter Event Date (dd Month yyyy)"
                                      keyboardType="default"
                                      placeholderTextColor="#9496A5"
                                    />
                                  </View>
                                </View>
                                {optionModel && (
                                  <View style={Style.optionModel}>
                                    <FlatList
                                      data={options}
                                      renderItem={({item}) => (
                                        <TouchableOpacity
                                          onPress={() => {
                                            setEventType(item);
                                            setOptionModel(false);
                                          }}>
                                          <Text style={Style.optionText}>
                                            {item}
                                          </Text>
                                        </TouchableOpacity>
                                      )}
                                      keyExtractor={(item, index) =>
                                        index.toString()
                                      }
                                    />
                                  </View>
                                )}
                                <View style={Style.inputviews}>
                                  <Text style={Style.nametext}>Event Type</Text>
                                  <TouchableOpacity
                                    onPress={() => setOptionModel(true)}>
                                    <TextInput
                                      style={Style.input}
                                      onChangeText={value =>
                                        setEventType(value)
                                      }
                                      value={eventType}
                                      placeholder="Select Event Type"
                                      keyboardType="default"
                                      placeholderTextColor="#9496A5"
                                      editable={false}
                                    />
                                    <View style={Style.arrow}>
                                      <Image
                                        style={Style.arrowimg}
                                        source={Arrow}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View
                                style={Style.opacity}
                              />
                              <TouchableOpacity
                                onPress={filterEvent}
                                style={Style.botton}>
                                <Text style={Style.bottontext}>
                                  Show Results
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                    <FlatList
                      data={events}
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
          )}
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
    width: '100%',
    position: 'relative',
  },
  resent: {
    color: '#171B2E',
    marginTop: 32,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    flexDirection: 'row',
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
  eventimg: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'relative',
  },
  eventname: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#171B2E',
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
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    height: 554,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headingview: {
    height: 23,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modelheading: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 23,
    color: '#171B2E',
  },
  headingright: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#6F3DE9',
  },
  customMarker: {
    borderWidth: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 16,
    width: 16,
    borderColor: '#6F3DE9',
    marginTop: 23,
  },
  markerText: {
    color: '#000000',
    marginTop: 5,
  },
  botton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#6F3DE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 12,
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  inputviews: {
    height: 82,
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
    position: 'relative',
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
  optionModel: {
    position: 'absolute',
    zIndex: 999,
    top: -110,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
    padding: 5,
  },
  pricerange: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#171B2E',
    marginBottom: 40,
  },
  hr: {
    borderWidth: 1,
    borderColor: '#EFF0F9',
    marginTop: 55,
  },
  arrow: {
    position: 'absolute',
    top: '28%',
    right: '2%',
  },
  arrowimg: {
    height: 24,
    width: 24,
  },
  modalopacity: {
    width: 42,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#EFF0F9',
  },
  profileimg: {
    height: 19,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminpic: {
    width: 18,
    height: 18,
    borderRadius: 100,
    marginRight: 7,
  },
  eventpic: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'relative',
  },
  adminname: {
    height: 19,
    color: '#171B2E',
    fontSize: 12,
    fontWeight: '400',
  },
  eventprice: {
    backgroundColor: '#EFF0F9',
    height: 32,
    width: 50,
    borderRadius: 40,
    color: '#6F3DE9',
    textAlign: 'center',
    padding: 5,
  },
  eventdate: {
    color: '#171B2E',
    borderTopWidth: 1,
    borderColor: '#EFF0F9',
    paddingTop: 10,
  },
  eventpicview: {
    height: 19,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    width: 18,
    height: 18,
    borderRadius: 100,
    marginRight: 7,
  },
  imgpic: {
    height: 19,
    color: '#171B2E',
    fontSize: 12,
    fontWeight: '400',
  },
  opacity: {
    borderWidth: 1,
    borderColor: '#EFF0F9',
    marginVertical: 4,
  },
});
