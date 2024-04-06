import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import filter from '../../../assets/images/Filter.png';
import search from '../../../assets/images/Search.png';
import Card from '../../../components/card/Card';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Arrow from '../../../assets/images/ArrowRight.png';
import HomeStyle from './HomeStyle';
import useHome from '../../../hooks/useHome';
import images from '../../../assets/images/images.jpg';
import blank from "../../../assets/images/blank.jpg"

const Home = ({navigation}: any) => {
  const {
    recenteventimg,
    recentimg,
    filterEvent,
    options,
    handleValuesChange,
    eventDate,
    optionModel,
    sortedEvents,
    events,
    modalVisible,
    setModalVisible,
    recentEvent,
    values,
    setEventDate,
    setEventType,
    setOptionModel,
    eventType,
  } = useHome();
  const renderCustomMarker = (props: any) => (
    <>
      <View style={HomeStyle.customMarker}></View>
      <Text style={HomeStyle.markerText}>${props.currentValue}</Text>
    </>
  );

  return (
    <FlatList
      data={[1]}
      renderItem={() => (
        <View style={HomeStyle.container}>
          {sortedEvents.length > 0 ? (
            <View>
              <View style={{marginHorizontal: 20}}>
                <View style={HomeStyle.resent}>
                  <Text style={HomeStyle.resenttext}>Recent Events</Text>
                  <View style={HomeStyle.modalopacity}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image style={HomeStyle.resentimg} source={filter} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={HomeStyle.inputview}>
                  <Image style={{height: 24, width: 24}} source={search} />
                  <Text style={{color: '#171B2E'}}>search...</Text>
                </TouchableOpacity>

                <FlatList
                  data={sortedEvents}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EventDetail', {param: item})
                        }
                        style={HomeStyle.mianview}>
                        <View style={HomeStyle.imgview}>
                          <Image
                            style={HomeStyle.eventimg}
                            source={{uri: item?.EventImage}}
                          />
                          <Text style={HomeStyle.mainimgbotton}>Concert</Text>
                          <View style={HomeStyle.mainviewtext}>
                            <View style={HomeStyle.operview}>
                              <View>
                                <Text style={HomeStyle.eventname}>
                                  {item ? item?.EventName : 'Loading....'}
                                </Text>
                                <View style={HomeStyle.profileimg}>
                                  {item?.EventAdminPhoto ? (
                                    <Image
                                      style={HomeStyle.adminpic}
                                      source={{uri: item?.EventAdminPhoto}}
                                    />
                                  ) : (
                                    <Image
                                      style={HomeStyle.adminpic}
                                      source={images}
                                    />
                                  )}

                                  <Text style={HomeStyle.adminname}>
                                    {item ? item.EventAdminName : 'Loading....'}
                                  </Text>
                                </View>
                              </View>
                              <Text style={HomeStyle.eventprice}>
                                ${item ? item.EventPrice : 'Loading..'}
                              </Text>
                            </View>
                            <Text style={HomeStyle.eventdate}>
                              {item ? item.EventDate : 'Loading..'}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}>
                        <TouchableWithoutFeedback
                          onPress={() => setModalVisible(false)}>
                          <View style={HomeStyle.modalBackground}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                              <View style={HomeStyle.modalContent}>
                                <View style={HomeStyle.headingview}>
                                  <Text style={HomeStyle.modelheading}>
                                    Filters
                                  </Text>
                                  <Text
                                    style={HomeStyle.headingright}
                                    onPress={() => {
                                      setModalVisible(false);
                                    }}>
                                    reset
                                  </Text>
                                </View>
                                <Text style={HomeStyle.pricerange}>
                                  Price Range
                                </Text>
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
                                  <View style={HomeStyle.hr} />
                                </View>
                                <View style={{position: 'relative'}}>
                                  <View style={HomeStyle.inputviews}>
                                    <Text style={HomeStyle.nametext}>
                                      Event Date
                                    </Text>
                                    <View>
                                      <TextInput
                                        style={HomeStyle.input}
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
                                    <View style={HomeStyle.optionModel}>
                                      <FlatList
                                        data={options}
                                        renderItem={({item}) => (
                                          <TouchableOpacity
                                            onPress={() => {
                                              setEventType(item);
                                              setOptionModel(false);
                                            }}>
                                            <Text style={HomeStyle.optionText}>
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
                                  <View style={HomeStyle.inputviews}>
                                    <Text style={HomeStyle.nametext}>
                                      Event Type
                                    </Text>
                                    <TouchableOpacity
                                      onPress={() => setOptionModel(true)}>
                                      <TextInput
                                        style={HomeStyle.input}
                                        onChangeText={value =>
                                          setEventType(value)
                                        }
                                        value={eventType}
                                        placeholder="Select Event Type"
                                        keyboardType="default"
                                        placeholderTextColor="#9496A5"
                                        editable={false}
                                      />
                                      <View style={HomeStyle.arrow}>
                                        <Image
                                          style={HomeStyle.arrowimg}
                                          source={Arrow}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <View style={HomeStyle.opacity} />
                                <TouchableOpacity
                                  onPress={filterEvent}
                                  style={HomeStyle.botton}>
                                  <Text style={HomeStyle.bottontext}>
                                    Show Results
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        </TouchableWithoutFeedback>
                      </Modal>
                    </View>
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
                    <View style={HomeStyle.resent}>
                      <Text style={HomeStyle.resenttext}>Recent Events</Text>
                      <View style={HomeStyle.modalopacity}>
                        <TouchableOpacity>
                          <Image style={HomeStyle.resentimg} source={filter} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      style={HomeStyle.inputview}>
                      <Image style={{height: 24, width: 24}} source={search} />
                      <Text style={{color: '#171B2E'}}>search...</Text>
                    </TouchableOpacity>
                    <View style={HomeStyle.ongoing}>
                      <Text style={HomeStyle.ongoingtext}>On Going Events</Text>
                      <Text style={HomeStyle.ongoingtext2}>see all</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EventDetail', {param: recentEvent})
                      }
                      style={HomeStyle.mianview}>
                      <View style={HomeStyle.imgview}>
                        {recentEvent?.EventImage ? (
                          <Image
                            style={HomeStyle.eventpic}
                            source={recenteventimg}
                          />
                        ) : (
                          <Image
                            style={HomeStyle.eventpic}
                            source={blank}
                          />
                        )}

                        <Text style={HomeStyle.mainimgbotton}>Concert</Text>
                        <View style={HomeStyle.mainviewtext}>
                          <View style={HomeStyle.operview}>
                            <View>
                              <Text style={HomeStyle.eventname}>
                                {recentEvent
                                  ? recentEvent?.EventName
                                  : 'Loading....'}
                              </Text>
                              <View style={HomeStyle.eventpicview}>
                                {recentEvent?.EventAdminPhoto ? (
                                  <Image
                                    style={HomeStyle.pic}
                                    source={recentimg}
                                  />
                                ) : (
                                  <Image
                                    style={HomeStyle.pic}
                                    source={images}
                                  />
                                )}

                                <Text style={HomeStyle.imgpic}>
                                  {recentEvent
                                    ? recentEvent.EventAdminName
                                    : 'Loading....'}
                                </Text>
                              </View>
                            </View>
                            <Text style={HomeStyle.eventprice}>
                              $
                              {recentEvent
                                ? recentEvent.EventPrice
                                : 'Loading..'}
                            </Text>
                          </View>
                          <Text style={HomeStyle.eventdate}>
                            {recentEvent ? recentEvent.EventDate : 'Loading..'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={HomeStyle.ongoing}>
                      <Text style={HomeStyle.ongoingtext}>Other Event</Text>
                      <Text style={HomeStyle.ongoingtext2}>see all</Text>
                    </View>
                    <Modal
                      visible={modalVisible}
                      transparent={true}
                      animationType="slide"
                      onRequestClose={() => setModalVisible(false)}>
                      <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}>
                        <View style={HomeStyle.modalBackground}>
                          <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={HomeStyle.modalContent}>
                              <View style={HomeStyle.headingview}>
                                <Text style={HomeStyle.modelheading}>
                                  Filters
                                </Text>
                                <Text
                                  style={HomeStyle.headingright}
                                  onPress={() => {
                                    setModalVisible(false);
                                  }}>
                                  reset
                                </Text>
                              </View>
                              <Text style={HomeStyle.pricerange}>
                                Price Range
                              </Text>
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
                                <View style={HomeStyle.hr} />
                              </View>
                              <View style={{position: 'relative'}}>
                                <View style={HomeStyle.inputviews}>
                                  <Text style={HomeStyle.nametext}>
                                    Event Date
                                  </Text>
                                  <View>
                                    <TextInput
                                      style={HomeStyle.input}
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
                                  <View style={HomeStyle.optionModel}>
                                    <FlatList
                                      data={options}
                                      renderItem={({item}) => (
                                        <TouchableOpacity
                                          onPress={() => {
                                            setEventType(item);
                                            setOptionModel(false);
                                          }}>
                                          <Text style={HomeStyle.optionText}>
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
                                <View style={HomeStyle.inputviews}>
                                  <Text style={HomeStyle.nametext}>
                                    Event Type
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => setOptionModel(true)}>
                                    <TextInput
                                      style={HomeStyle.input}
                                      onChangeText={value =>
                                        setEventType(value)
                                      }
                                      value={eventType}
                                      placeholder="Select Event Type"
                                      keyboardType="default"
                                      placeholderTextColor="#9496A5"
                                      editable={false}
                                    />
                                    <View style={HomeStyle.arrow}>
                                      <Image
                                        style={HomeStyle.arrowimg}
                                        source={Arrow}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View style={HomeStyle.opacity} />
                              <TouchableOpacity
                                onPress={filterEvent}
                                style={HomeStyle.botton}>
                                <Text style={HomeStyle.bottontext}>
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
