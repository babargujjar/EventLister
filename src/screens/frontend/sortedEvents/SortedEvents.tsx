import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import filter from '../../../assets/images/Filter.png';
import search from '../../../assets/images/Search.png';
import FilterdEvents from '../../../components/filteredEvents/FilteredEvents';

const SortedEvents = () => {
  return (
    <ScrollView style={Style.container}>
      <View style={{marginHorizontal: 20}}>
        <View style={Style.resent}>
          <Text style={Style.resenttext}>Recent Events</Text>
          <View style={Style.resentimgview}>
            <Image style={Style.resentimg} source={filter} />
          </View>
        </View>
        <View style={Style.inputview}>
          <Image style={{height: 24, width: 24}} source={search} />
          <Text style={{color: '#171B2E', paddingLeft: 10}}>search...</Text>
        </View>
        <View style={Style.ongoing}>
          <Text style={Style.ongoingtext}>Events</Text>
        </View>
        <FilterdEvents />
        <FilterdEvents />
        <FilterdEvents />
      </View>
    </ScrollView>
  );
};
export default SortedEvents;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    color: '#171B2E',
    flex: 1,
    // borderWidth: 2,
  },
  resent: {
    color: '#171B2E',
    marginTop: 32,

    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    flexDirection: 'row',
    // width: 335,
  },
  resentimgview: {
    width: 42,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#EFF0F9',
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
    // borderWidth: 1,
    // borderColor: '#FFFFFF',
    marginTop: 30,
    // backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    paddingLeft: 16,
  },
  ongoing: {
    height: 23,

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
});
