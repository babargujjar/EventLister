import {View, Text, Image} from 'react-native';
import React from 'react';
import { CardProps} from '../../constant/types';
import CardStyle from "./CardStyle"

const Card = ({param}: CardProps) => {
  console.log('param', param);
  const imageSource = {uri: param.EventImage};

  return (
    <View style={CardStyle.map}>
      <View style={CardStyle.innermap}>
        <Image
          style={{width: 88, height: 88, borderRadius: 12, marginRight: 12}}
          source={imageSource}
        />
        <View style={CardStyle.mapcontent}>
          <Text style={CardStyle.maptexts}>{param.EventType}</Text>
          <Text style={CardStyle.mapmaintitle}>{param.EventName}</Text>
          <Text style={CardStyle.maptexts}>{param.EventDate}</Text>
          <Text style={CardStyle.mapbutton}>${param.EventPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;


