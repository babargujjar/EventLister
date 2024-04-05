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
import CreateEventStyle from './CreateEventStyle';
import useCreateEvent from '../../../hooks/useCreateEvent';

const CreateEvent = () => {
  const {
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
    handleSelectImage,
    Event,
    optionModel,
    setOptionModel,
    options,
    imageURI,
  } = useCreateEvent();

  return (
    <ScrollView>
      <View style={CreateEventStyle.container}>
        <View>
          <Text style={CreateEventStyle.heading}>CreateEvent</Text>
        </View>
        <View>
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Name</Text>
            <View>
              <TextInput
                autoCorrect={true}
                style={CreateEventStyle.input}
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
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Price</Text>
            <View>
              <TextInput
                style={CreateEventStyle.input}
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
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Date</Text>
            <View>
              <TextInput
                style={CreateEventStyle.input}
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
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Type</Text>
            <TouchableOpacity onPress={() => setOptionModel(true)}>
              <TextInput
                style={CreateEventStyle.input}
                onChangeText={value => setEventType(value)}
                value={eventType}
                placeholder="Select Event Type"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                editable={false}
              />
              <View style={CreateEventStyle.arrow}>
                <Image style={CreateEventStyle.arrowimg} source={Arrow} />
              </View>
            </TouchableOpacity>
          </View>
          {optionModel && (
            <View style={CreateEventStyle.optionModel}>
              <FlatList
                data={options}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setEventType(item);
                      setOptionModel(false);
                    }}>
                    <Text style={CreateEventStyle.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        <View>
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Location</Text>
            <View>
              <TextInput
                style={CreateEventStyle.input}
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
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>
              Event Map Location URL
            </Text>
            <View>
              <TextInput
                style={CreateEventStyle.input}
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
          <Text style={CreateEventStyle.nametext}>Event Media</Text>
          <TouchableOpacity
            onPress={handleSelectImage}
            style={CreateEventStyle.inputimg}>
            {imageURI ? (
              <Image
                style={{zIndex: 995, height: '100%', width: '100%'}}
                source={{uri: imageURI}}
              />
            ) : (
              <>
                <Image style={CreateEventStyle.upload} source={Upload} />
                <Text
                  style={{color: '#171B2E', fontSize: 14, fontWeight: '600'}}>
                  Upload Image
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={Event} style={CreateEventStyle.botton}>
          <Text style={CreateEventStyle.bottontext}>Publish Events</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateEvent;
