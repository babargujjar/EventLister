import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import arrowleft from '../../../assets/images/arrow-left.png';
import map from '../../../assets/images/map.jpeg';
import mapicon from '../../../assets/images/mapicon.png';

const EventDetail = ({navigation, route}: any) => {
  const {param} = route.params;
  const Accountimg = {uri: param.EventAdminPhoto};
  const concertimg = {uri: param.EventImage};

  const openMap = () => {
    Linking.openURL(param.EventMapURL);
  };

  return (
    <FlatList
      data={[1]}
      renderItem={() => (
        <View style={Style.container}>
          <View style={Style.topview}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={Style.topimgview}>
              <Image style={{width: 24, height: 24}} source={arrowleft} />
            </TouchableOpacity>
            <Text style={Style.topviewtext}>Event Details</Text>
          </View>
          <TouchableOpacity>
            <Image style={Style.detailimg} source={concertimg} />
          </TouchableOpacity>
          <View style={Style.headingview}>
            <Text style={Style.headingtext1}>{param.EventName}</Text>
            <Text style={Style.headingtext2}>${param.EventPrice}</Text>
          </View>
          <Text style={Style.participate}>
            Participat {'  '} {param.EventDate}
          </Text>
          <View style={Style.desc}>
            <Text style={Style.desctext1}>About Event</Text>
            <Text style={Style.desctext2}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
              facere aliquid natus laborum reprehenderit accusantium dolores
              dolorum in quibusdam sit!
            </Text>
            <View style={Style.profileview}>
              <Image style={Style.profileimg} source={Accountimg} />
              <Text style={Style.profiletext}>{param.EventAdminName}</Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              lineHeight: 20,
              color: '#171B2E',
            }}>
            map
          </Text>
          <View style={{position: 'relative'}}>
            <Image style={Style.map} source={map} />
            <TouchableOpacity style={Style.mapbotton} onPress={openMap}>
              <Image style={Style.mapbottonicon} source={mapicon} />
              <Text>Direct map</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TicketDetail', {param: param})}
            style={Style.botton}>
            <Text style={Style.bottontext}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default EventDetail;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    position: 'relative',
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    height: 42,
    paddingRight: 120,
    alignItems: 'center',
    marginBottom: 30,
  },
  topviewtext: {
    color: '#171B2E',
    lineHeight: 18,
    fontWeight: '600',
    fontSize: 14,
  },
  topimgview: {
    borderWidth: 1,
    borderColor: '#EFF0F9',
    width: 42,
    height: 42,
    borderRadius: 40,
    padding: 9,
  },
  detailimg: {
    height: 180,
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
  },
  headingview: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headingtext1: {
    color: '#171B2E',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 23,
  },
  headingtext2: {
    backgroundColor: '#EFF0F9',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 40,
    color: '#6F3DE9',
    fontWeight: '500',
    fontSize: 12,
  },
  participate: {
    color: '#171B2E',
    height: 19,
    fontWeight: '600',
    lineHeight: 15,
    fontSize: 12,
  },
  desc: {
    height: 142,
    marginTop: 30,
    marginBottom: 33,
  },
  desctext1: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    color: '#171B2E',
    marginBottom: 8,
  },
  desctext2: {
    color: '#9496A5',
    fontWeight: '400',
    fontSize: 14,
  },
  profileview: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileimg: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  profiletext: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#171B2E',
  },
  map: {
    height: 140,
    borderRadius: 16,
    marginVertical: 20,
  },
  mapbotton: {
    backgroundColor: 'black',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 40,
    height: 35,
    width: 110,
    position: 'absolute',
    top: '40%',
    left: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  mapbottonicon: {
    height: 15,
    width: 15,
  },
  botton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#6F3DE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 12,
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
});
