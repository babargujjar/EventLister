import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import filter from '../../assets/images/Filter.png';
import search from '../../assets/images/Search.png';
import concert from '../../assets/images/concert.jpeg';

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
        <View style={Style.mianview}>
          <View style={Style.imgview}>
            <Image
              style={{
                borderRadius: 16,
                position: 'relative',
                width: '100%',
              }}
              source={concert}
            />
            <Text style={Style.mainimgbotton}>Concert</Text>
            <View style={Style.mainviewtext}>
              <View style={Style.operview}>
                <View>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 14,
                      lineHeight: 18,
                      color: '#171B2E',

                      // marginBottom: 8,
                    }}>
                    Radiohead concert
                  </Text>
                  <View
                    style={{
                      height: 19,

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
                      source={concert}
                    />
                    <Text
                      style={{
                        height: 19,
                        color: '#171B2E',
                        fontSize: 12,
                        fontWeight: '400',
                      }}>
                      account name
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
                  Price
                </Text>
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#EFF0F9',
                  paddingTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#171B2E'}}>Participates</Text>
                <Text style={{color: '#171B2E'}}>Date</Text>
              </View>
            </View>
          </View>
        </View>
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
  resentimgview:{
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

    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
