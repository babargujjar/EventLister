import { View, Text, TouchableWithoutFeedback, Modal, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HomeStyle from '../../screens/home/HomeStyle';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Input from '../input/Input';
import Button from '../button/Button';
import Arrow from "../../assets/images/ArrowRight.png"
import EventTypeOptions from '../eventTypeOptoins/EventTypeOptions';

const FilterModal = ({props}:any) => {
    const {
      modalVisible,
      setModalVisible,
      values,
      handleValuesChange,
      renderCustomMarker,
      setEventDate,
      eventDate,
      optionModel,
      setEventType,
      options,
      setOptionModel,
      filterEvent,
      eventType,

    } = props;
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={HomeStyle.modalBackground}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={HomeStyle.modalContent}>
              <View style={HomeStyle.headingview}>
                <Text style={HomeStyle.modelheading}>Filters</Text>
                <Text
                  style={HomeStyle.headingright}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  reset
                </Text>
              </View>
              <Text style={HomeStyle.pricerange}>Price Range</Text>
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
                  <Text style={HomeStyle.nametext}>Event Date</Text>
                  <View>
                    <Input
                      style={HomeStyle.input}
                      onChangeText={value => setEventDate(value)}
                      value={eventDate}
                      placeholder="Enter Event Date (dd Month yyyy)"
                      keyboardType="default"
                      placeholderTextColor="#9496A5"
                      secureTextEntry={false}
                      editable={true}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                {optionModel && (
                  <EventTypeOptions
                    prop={{options, setEventType, setOptionModel}}
                  />
                )}
                <View style={HomeStyle.inputviews}>
                  <Text style={HomeStyle.nametext}>Event Type</Text>
                  <TouchableOpacity onPress={() => setOptionModel(true)}>
                    <Input
                      style={HomeStyle.input}
                      onChangeText={value => setEventType(value)}
                      value={eventType}
                      placeholder="Select Event Type"
                      keyboardType="default"
                      placeholderTextColor="#9496A5"
                      editable={false}
                      secureTextEntry={false}
                      autoCorrect={false}
                    />
                    <View style={HomeStyle.arrow}>
                      <Image style={HomeStyle.arrowimg} source={Arrow} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={HomeStyle.opacity} />
              <TouchableOpacity onPress={filterEvent} style={HomeStyle.botton}>
                <Text style={HomeStyle.bottontext}>Show Results</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default FilterModal