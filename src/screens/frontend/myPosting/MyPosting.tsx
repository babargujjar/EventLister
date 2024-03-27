import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import search from '../../../assets/images/Search.png';
import concert from '../../assets/images/concert.jpeg';
import Card from '../../../components/card/Card';

const MyPosting = ({navigation}: any) => {
  return (
    <ScrollView>
      <View style={Style.container}>
        <Text style={Style.heading}>My Event Postings</Text>
        <View style={Style.inputview}>
          <Image style={{height: 24, width: 24}} source={search} />
          <Text style={{color: '#171B2E'}}>search...</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('EventDetail');
          }}>
          <Card />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyPosting;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
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
