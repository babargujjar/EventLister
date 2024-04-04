import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const Card = ({param}: any) => {
  const imageSource = {uri: param.EventImage};

  return (
    <View style={Style.map}>
      <View style={Style.innermap}>
        <Image
          style={{width: 88, height: 88, borderRadius: 12, marginRight: 12}}
          source={imageSource}
        />
        <View style={Style.mapcontent}>
          <Text style={Style.maptexts}>{param.EventType}</Text>
          <Text style={Style.mapmaintitle}>{param.EventName}</Text>
          <Text style={Style.maptexts}>{param.EventDate}</Text>
          <Text style={Style.mapbutton}>${param.EventPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const Style = StyleSheet.create({
  map: {
    height: 100,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    padding: 6,
    marginBottom: 15,
  },
  innermap: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  mapcontent: {
    height: 72,
    margin: 8,
    position: 'relative',
    width: '65%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  maptexts: {
    fontSize: 12,
    color: '#9496A5',
    fontWeight: '400',
    lineHeight: 19,
  },
  mapmaintitle: {
    fontSize: 14,
    color: '#171B2E',
    fontWeight: '600',
    lineHeight: 18,
  },
  mapbutton: {
    backgroundColor: '#EFF0F9',
    height: 32,
    borderRadius: 40,
    color: '#6F3DE9',
    textAlign: 'center',
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  }
});
