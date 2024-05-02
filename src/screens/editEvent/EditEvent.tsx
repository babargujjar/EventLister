import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Upload from '../../assets/images/Upload.png';
import Arrow from '../../assets/images/ArrowRight.png';
import {CardProp} from '../../constant/types';
import EditEventStyle from './EditEventStyle';
import useEditEvent from '../../hooks/useEditEvent';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import EventTypeOptions from '../../components/eventTypeOptoins/EventTypeOptions';

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
    loading,
    setLoading,
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
              <Input
                autoCorrect={true}
                style={EditEventStyle.input}
                placeholder="Enter Name"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                value={eventName}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setEventName(value)
                }
                secureTextEntry={false}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Price</Text>
            <View>
              <Input
                style={EditEventStyle.input}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setPrice(value)
                }
                value={price}
                placeholder="$ 0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={false}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Date</Text>
            <View>
              <Input
                style={EditEventStyle.input}
                onChangeText={value => setEventDate(value)}
                value={eventDate}
                placeholder="Enter Event Date (dd Month yyyy)"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={false}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Type</Text>
            <TouchableOpacity onPress={() => setOptionModel(true)}>
              <Input
                style={EditEventStyle.input}
                onChangeText={value => setEventType(value)}
                value={eventType}
                placeholder="Select Event Type"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                editable={false} // to prevent direct editing of Input
                autoCorrect={false}
                secureTextEntry={false}
              />
              <View style={EditEventStyle.arrow}>
                <Image style={EditEventStyle.arrowimg} source={Arrow} />
              </View>
            </TouchableOpacity>
          </View>
          {optionModel && (
            <EventTypeOptions prop={{options, setEventType, setOptionModel}} />
          )}
        </View>

        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Location</Text>
            <View>
              <Input
                style={EditEventStyle.input}
                onChangeText={value => setEventLocation(value)}
                value={eventLocation}
                placeholder="Event Location"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={false}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={EditEventStyle.inputview}>
            <Text style={EditEventStyle.nametext}>Event Map Location URL</Text>
            <View>
              <Input
                style={EditEventStyle.input}
                onChangeText={value => setEventMapURL(value)}
                value={eventMapURL}
                placeholder="URL"
                keyboardType="url"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={false}
                editable={true}
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
        {loading && (
          <View style={EditEventStyle.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Button onPress={handleEditEvent} style={EditEventStyle.botton}>
          <Text style={EditEventStyle.bottontext}>Edit Events</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditEvent;
