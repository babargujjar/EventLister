import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import concert from "../../assets/images/concert.jpeg"

const FilterdEvents = () => {
  return (
    <ScrollView>
      <View style={Style.mianview}>
        <View style={Style.imgview}>
          <Image
            style={Style.headimg}
            source={concert}
          />
          <Text style={Style.mainimgbotton}>Concert</Text>
          <View style={Style.mainviewtext}>
            <View style={Style.operview}>
              <View>
                <Text
                  style={Style.head}>
                  Radiohead concert
                </Text>
                <View
                  style={Style.imagview}>
                  <Image
                    style={Style.image}
                    source={concert}
                  />
                  <Text
                    style={Style.account}>
                    account name
                  </Text>
                </View>
              </View>
              <Text
                style={Style.price}>
                Price
              </Text>
            </View>
            <View
              style={Style.participate}>
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

const Style = StyleSheet.create({
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
  head: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#171B2E',
  },
  operview: {
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    backgroundColor: '#EFF0F9',
    height: 32,
    width: 50,
    borderRadius: 40,
    color: '#6F3DE9',
    textAlign: 'center',
    padding: 5,
  },
  participate: {
    borderTopWidth: 1,
    borderColor: '#EFF0F9',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headimg: {
    borderRadius: 16,
    position: 'relative',
    width: '100%',
  },
  imagview: {
    height: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 18,
    height: 18,
    borderRadius: 100,
    marginRight: 7,
  },
  account: {
    height: 19,
    color: '#171B2E',
    fontSize: 12,
    fontWeight: '400',
  },
});
