import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import arrowleft from '../../../assets/images/arrow-left.png';
import map from '../../../assets/images/map.jpeg';
import mapicon from '../../../assets/images/mapicon.png';
import EventDetailStyle from './EventDetailStyle';
import useEventDetail from '../../../hooks/useEventDetail';


const EventDetail = ({navigation, route}: any) => {
  const {param} = route.params;
  const {openMap, addParticipate, Accountimg, concertimg} = useEventDetail({param});

  return (
    <FlatList
      data={[1]}
      renderItem={() => (
        <View style={EventDetailStyle.container}>
          <View style={EventDetailStyle.topview}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={EventDetailStyle.topimgview}>
              <Image style={{width: 24, height: 24}} source={arrowleft} />
            </TouchableOpacity>
            <Text style={EventDetailStyle.topviewtext}>Event Details</Text>
          </View>
          <TouchableOpacity>
            <Image style={EventDetailStyle.detailimg} source={concertimg} />
          </TouchableOpacity>
          <View style={EventDetailStyle.headingview}>
            <Text style={EventDetailStyle.headingtext1}>{param?.EventName}</Text>
            <Text style={EventDetailStyle.headingtext2}>${param?.EventPrice}</Text>
          </View>
          <Text style={EventDetailStyle.participate}>
            {param?.EventParticipates} Participat {'  '} {param?.EventDate}
          </Text>
          <View style={EventDetailStyle.desc}>
            <Text style={EventDetailStyle.desctext1}>About Event</Text>
            <Text style={EventDetailStyle.desctext2}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
              facere aliquid natus laborum reprehenderit accusantium dolores
              dolorum in quibusdam sit!
            </Text>
            <View style={EventDetailStyle.profileview}>
              <Image style={EventDetailStyle.profileimg} source={Accountimg} />
              <Text style={EventDetailStyle.profiletext}>{param?.EventAdminName}</Text>
            </View>
          </View>
          <Text style={EventDetailStyle.maptext}>map</Text>
          <View style={{position: 'relative'}}>
            <Image style={EventDetailStyle.map} source={map} />
            <TouchableOpacity style={EventDetailStyle.mapbotton} onPress={openMap}>
              <Image style={EventDetailStyle.mapbottonicon} source={mapicon} />
              <Text>Direct map</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={addParticipate} style={EventDetailStyle.botton}>
            <Text style={EventDetailStyle.bottontext}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default EventDetail;

