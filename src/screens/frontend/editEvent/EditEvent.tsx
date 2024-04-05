import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Upload from '../../../assets/images/Upload.png';
import {FlatList} from 'react-native-gesture-handler';
import Arrow from '../../../assets/images/ArrowRight.png';
import {CardProp} from '../../../constant/types';
import EditEventStyle from './EditEventStyle';
import useEditEvent from '../../../hooks/useEditEvent';

const EditEvent = ({route}: CardProp) => {
  const {param} = route.params;

  const {
    handleSelectImage,
    eventDate,
    setEventDate,
    eventLocation,
    setEventLocation,
    eventMapURL,
    setEventMapURL,
    eventName,
    setEventName,
    eventType,
    setEventType,
    price,
    setPrice,
    optionModel,
    setOptionModel,
    options,
    imageURI,
    handleEditEvent,
  } = useEditEvent({param});

  return (
    <ScrollView>
      <View style={EditEventStyle.container}>
        <View>
          <Text style={EditEventStyle.heading}>EditEvent</Text>
        </View>
        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Name</Text>
            <View>
              <TextInput
                autoCorrect={true}
                style={EditEventStyle.input}
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
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Price</Text>
            <View>
              <TextInput
                style={EditEventStyle.input}
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
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Date</Text>
            <View>
              <TextInput
                style={EditEventStyle.input}
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
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Type</Text>
            <TouchableOpacity onPress={() => setOptionModel(true)}>
              <TextInput
                style={EditEventStyle.input}
                onChangeText={value => setEventType(value)}
                value={eventType}
                placeholder="Select Event Type"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                editable={false} // to prevent direct editing of TextInput
              />
              <View style={EditEventStyle.arrow}>
                <Image style={EditEventStyle.arrowimg} source={Arrow} />
              </View>
            </TouchableOpacity>
          </View>
          {optionModel && (
            <View style={EditEventStyle.optionModel}>
              <FlatList
                data={options}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setEventType(item);
                      setOptionModel(false);
                    }}>
                    <Text style={EditEventStyle.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Location</Text>
            <View>
              <TextInput
                style={EditEventStyle.input}
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
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Map Location URL</Text>
            <View>
              <TextInput
                style={EditEventStyle.input}
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
          <Text style={EditEventStyle.nametext}>Event Media</Text>
          <TouchableOpacity
            onPress={handleSelectImage}
            style={EditEventStyle.inputimg}>
            {imageURI ? (
              <Image
                style={{zIndex: 995, height: '100%', width: '100%'}}
                source={{uri: imageURI}}
              />
            ) : (
              <>
                <Image style={EditEventStyle.upload} source={Upload} />
                <Text
                  style={{color: '#171B2E', fontSize: 14, fontWeight: '600'}}>
                  Upload Image
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleEditEvent}
          style={EditEventStyle.botton}>
          <Text style={EditEventStyle.bottontext}>Edit Events</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditEvent;
