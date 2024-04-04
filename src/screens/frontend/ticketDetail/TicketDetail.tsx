import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import arrowleft from '../../../assets/images/arrow-left-white.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TicketDetail = ({navigation, route}: any) => {

  const {param} = route.params;
  const concertimg = {uri: param.EventImage};

  return (
    <ScrollView>
      <View style={Style.container}>
        <View style={Style.topview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={Style.topimgview}>
            <Image style={{width: 24, height: 24}} source={arrowleft} />
          </TouchableOpacity>
          <Text style={Style.topviewtext}>Detail Ticket</Text>
        </View>
        <View style={Style.mianview}>
          <Image style={Style.mainviewimg} source={concertimg} />
          <Text style={Style.mainimgbotton}>Concert</Text>
          <View style={{marginHorizontal: 10}}>
            <View style={Style.operview}>
              <Text style={Style.headingmainview}>{param.EventName}</Text>
              <Text style={Style.priceinmainview}>${param.EventPrice}</Text>
            </View>

            <View style={{height: 39}}>
              <View style={Style.user}>
                <Text style={Style.usertext}>Ticket Holder</Text>
                <Text style={Style.usertext}>Date</Text>
              </View>
              <View style={Style.user}>
                <Text style={Style.userdatatext}>{param.EventAdminName}</Text>
                <Text style={Style.userdatatext}>{param.EventDate}</Text>
              </View>
            </View>
            <View style={{marginTop: 16}}>
              <Text style={Style.usertext}>Location</Text>
              <Text style={Style.userdatatext}>{param.EventLocation}</Text>
            </View>
          </View>
          <View
            style={Style.lineparent}>
            <View style={Style.emptyviewleft}></View>
            <Text
              style={Style.line}></Text>
            <View style={Style.emptyviewrigth}></View>
          </View>
          <View style={Style.barcode}></View>
          <Text style={Style.barcodetext}>Scan Barcode</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketDetail;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#171B2E',
    paddingHorizontal: 20,
    height: '100%',
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    height: 42,
    paddingRight: 120,
    alignItems: 'center',
    marginBottom: 30,
  },
  topviewtext: {
    color: '#FFFFFF',
    lineHeight: 18,
    fontWeight: '600',
    fontSize: 14,
  },
  topimgview: {
    width: 42,
    height: 42,
    borderRadius: 40,
    padding: 9,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 5,
    padding: 6,
    marginBottom: 60,
  },
  mainviewimg: {
    borderRadius: 16,
    position: 'relative',
    width: '100%',
    marginBottom: 16,
    height: 160,
  },
  headingmainview: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#171B2E',
  },
  priceinmainview: {
    backgroundColor: '#EFF0F9',
    height: 32,
    borderRadius: 40,
    color: '#6F3DE9',
    textAlign: 'center',
    padding: 5,
  },
  operview: {
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usertext: {
    color: '#9496A5',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 19,
  },
  userdatatext: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    color: '#171B2E',
  },
  emptyviewrigth: {
    backgroundColor: '#171B2E',
    height: 50,
    width: 50,
    borderRadius: 100,
    right: -32,
  },
  emptyviewleft: {
    backgroundColor: '#171B2E',
    height: 50,
    width: 50,
    borderRadius: 100,
    left: -32,
  },
  barcode: {
    height: 82,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  barcodetext: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 19,
    color: '#171B2E',
    textAlign: 'center',
    marginBottom: 16,
  },
  lineparent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderRadius: 6,
    borderStyle: 'dotted',
    width: 200,
  },
});
