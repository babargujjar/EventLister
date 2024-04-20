import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import arrowleft from '../../assets/images/arrow-left-white.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TicketDetailStyle from './TicketDetailStyle';

const TicketDetail = ({navigation, route}: any) => {
  const {param} = route.params;
  const concertimg = {uri: param.EventImage};

  return (
    <ScrollView>
      <View style={TicketDetailStyle.container}>
        <View style={TicketDetailStyle.topview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={TicketDetailStyle.topimgview}>
            <Image style={{width: 24, height: 24}} source={arrowleft} />
          </TouchableOpacity>
          <Text style={TicketDetailStyle.topviewtext}>Detail Ticket</Text>
        </View>
        <View style={TicketDetailStyle.mianview}>
          <Image style={TicketDetailStyle.mainviewimg} source={concertimg} />
          <Text style={TicketDetailStyle.mainimgbotton}>Concert</Text>
          <View style={{marginHorizontal: 10}}>
            <View style={TicketDetailStyle.operview}>
              <Text style={TicketDetailStyle.headingmainview}>{param.EventName}</Text>
              <Text style={TicketDetailStyle.priceinmainview}>${param.EventPrice}</Text>
            </View>

            <View style={{height: 39}}>
              <View style={TicketDetailStyle.user}>
                <Text style={TicketDetailStyle.usertext}>Ticket Holder</Text>
                <Text style={TicketDetailStyle.usertext}>Date</Text>
              </View>
              <View style={TicketDetailStyle.user}>
                <Text style={TicketDetailStyle.userdatatext}>{param.EventAdminName}</Text>
                <Text style={TicketDetailStyle.userdatatext}>{param.EventDate}</Text>
              </View>
            </View>
            <View style={{marginTop: 16}}>
              <Text style={TicketDetailStyle.usertext}>Location</Text>
              <Text style={TicketDetailStyle.userdatatext}>{param.EventLocation}</Text>
            </View>
          </View>
          <View style={TicketDetailStyle.lineparent}>
            <View style={TicketDetailStyle.emptyviewleft}></View>
            <Text style={TicketDetailStyle.line}></Text>
            <View style={TicketDetailStyle.emptyviewrigth}></View>
          </View>
          <View style={TicketDetailStyle.barcode}></View>
          <Text style={TicketDetailStyle.barcodetext}>Scan Barcode</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketDetail;


