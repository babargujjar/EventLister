import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import search from '../../assets/images/Search.png';
import concert from '../../assets/images/concert.jpeg';

const MyPosting = () => {
  return (
    <ScrollView>
      <View style={Style.container}>
        <Text style={Style.heading}>My Event Postings</Text>
        <View style={Style.inputview}>
          <Image style={{height: 24, width: 24}} source={search} />
          <Text style={{color: '#171B2E'}}>search...</Text>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>
        <View style={Style.card}>
          <View style={Style.innermap}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                source={concert}
              />
            </TouchableOpacity>
            <View style={Style.mapcontent}>
              <Text style={Style.maptexts}>Workshop</Text>
              <Text style={Style.mapmaintitle}>Framer Workshop</Text>
              <Text style={Style.maptexts}>Date</Text>
              <Text style={Style.mapbutton}>Price</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

export default MyPosting;


const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  heading: {
    color: '#171B2E',
    marginTop: 32,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  inputview: {
    height: 52,
    borderRadius: 26,
    borderColor: '#EAEAED',
    borderWidth: 1,
    // borderColor: '#FFFFFF',
    marginTop: 43,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    paddingLeft: 16,
  },
  card: {
    height: 100,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 6,
    // marginBottom:150
    marginTop:19
  },
  innermap: {
    // borderWidth: 1,
    height: 88,
    flex: 1,
    flexDirection: 'row',
    alignItems:'center'
  },
  mapcontent: {
    height:72,
    margin: 8,
    position: 'relative',
    width:'65%',
    flexDirection:'column',
    justifyContent:"space-between"
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
    width: 50,
    borderRadius: 40,
    color: '#6F3DE9',
    textAlign: 'center',
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});


