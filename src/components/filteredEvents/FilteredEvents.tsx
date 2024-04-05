import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import concert from '../../assets/images/concert.jpeg';
import FilteredEventsStyle from './FilterdEventsStyle';


const FilterdEvents = () => {
  return (
    <ScrollView>
      <View style={FilteredEventsStyle.mianview}>
        <View style={FilteredEventsStyle.imgview}>
          <Image style={FilteredEventsStyle.headimg} source={concert} />
          <Text style={FilteredEventsStyle.mainimgbotton}>Concert</Text>
          <View style={FilteredEventsStyle.mainviewtext}>
            <View style={FilteredEventsStyle.operview}>
              <View>
                <Text style={FilteredEventsStyle.head}>Radiohead concert</Text>
                <View style={FilteredEventsStyle.imagview}>
                  <Image style={FilteredEventsStyle.image} source={concert} />
                  <Text style={FilteredEventsStyle.account}>account name</Text>
                </View>
              </View>
              <Text style={FilteredEventsStyle.price}>Price</Text>
            </View>
            <View style={FilteredEventsStyle.participate}>
              <Text style={{color: '#171B2E'}}>Participates</Text>
              <Text style={{color: '#171B2E'}}>Date</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FilterdEvents;


