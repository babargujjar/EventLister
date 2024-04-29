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
import {FlatList} from 'react-native-gesture-handler';
import Arrow from '../../assets/images/ArrowRight.png';
import CreateEventStyle from './CreateEventStyle';
import useCreateEvent from '../../hooks/useCreateEvent';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import EventTypeOptions from '../../components/eventTypeOptoins/EventTypeOptions';

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
    handleCrateEvent,
    optionModel,
    setOptionModel,
    options,
    imageURI,
    loading,
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
              <Input
                autoCorrect={true}
                style={CreateEventStyle.input}
                placeholder="Enter Name"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                value={eventName}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setEventName(value)
                }
                secureTextEntry={undefined}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Price</Text>
            <View>
              <Input
                style={CreateEventStyle.input}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setPrice(value)
                }
                value={price}
                placeholder="$ 0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={undefined}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Date</Text>
            <View>
              <Input
                style={CreateEventStyle.input}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setEventDate(value)
                }
                value={eventDate}
                placeholder="Enter Event Date (dd Month yyyy)"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={undefined}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Type</Text>
            <TouchableOpacity onPress={() => setOptionModel(true)}>
              <Input
                style={CreateEventStyle.input}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setEventType(value)
                }
                value={eventType}
                placeholder="Select Event Type"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                editable={false}
                autoCorrect={false}
                secureTextEntry={false}
              />
              <View style={CreateEventStyle.arrow}>
                <Image style={CreateEventStyle.arrowimg} source={Arrow} />
              </View>
            </TouchableOpacity>
          </View>
          {optionModel && (
            <EventTypeOptions prop={{options, setEventType, setOptionModel}} />
          )}
        </View>

        <View>
          <View style={CreateEventStyle.inputview}>
            <Text style={CreateEventStyle.nametext}>Event Location</Text>
            <View>
              <Input
                style={CreateEventStyle.input}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setEventLocation(value)
                }
                value={eventLocation}
                placeholder="Event Location"
                keyboardType="default"
                placeholderTextColor="#171B2E"
                autoCorrect={false}
                secureTextEntry={undefined}
                editable={true}
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
              <Input
                style={CreateEventStyle.input}
                onChangeText={(value: React.SetStateAction<string>) =>
                  setEventMapURL(value)
                }
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
        {loading && (
          <View style={CreateEventStyle.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Button onPress={handleCrateEvent} style={CreateEventStyle.botton}>
          <Text style={CreateEventStyle.bottontext}>Publish Events</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateEvent;
