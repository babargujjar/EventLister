import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import editimg from '../../../assets/images/Discoveryfocused.png';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation}: any) => {
  const [imageURI, setImageURI] = useState('');


  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const {uri} = response.assets[0];
        if (uri) {
          setImageURI(uri);
        }
      }
    });
  };
  return (
    <ScrollView>
      <View style={Style.container}>
        <View style={Style.headingview}>
          <Text style={Style.heading}>Profile Settings</Text>
          <TouchableOpacity style={Style.logoutview}>
            <Text style={Style.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleSelectImage} style={Style.imgview}>
            {imageURI ? (
              <Image style={{width:'100%',height:"100%"}} source={{uri: imageURI}} />
            ) : (
              <Image style={Style.editimg} source={editimg} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Name</Text>
            <View>
              <TextInput
                style={Style.input}
                // defaultValue={state}
                placeholder="User Name"
                placeholderTextColor="#171B2E"
                // onChangeText={inputHandler}
                keyboardType="default"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Email</Text>
            <View>
              <TextInput
                style={Style.input}
                // defaultValue={state}
                placeholder="Email"
                placeholderTextColor="#171B2E"
                // onChangeText={inputHandler}
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={Style.botton}>
          <Text style={(Style.bottontext, {color: '#FFFFFF'})}>
            Update Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.botton2}
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}>
          <Text style={(Style.bottontext, {color: '#6F3DE9'})}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    color: '#171B2E',
    flex: 1,
    paddingTop: 28,
    paddingHorizontal: 20,
    // borderWidth: 2,
  },
  headingview: {
    height: 42,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    color: '#171B2E',
    marginRight: 20,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
  },
  logoutview: {
    height: 42,
    width: 89,
    backgroundColor: '#6F3DE9',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  logout: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
  },
  imgview: {
    height: 125,
    width: 125,
    marginTop: 37,
    borderColor: '#171B2E',
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: '#E2E2E2',
    borderRadius: 71,
    position: 'relative',
    marginBottom: 31,
    overflow:'hidden'
  },
  editimg: {
    position: 'absolute',
    height: 16,
    width: 16,
    bottom: 15,
    right: 6,
  },
  inputview: {
    height: 82,
    flexDirection: 'column',
    gap: 12,
    marginBottom: 18,
  },
  input: {
    height: 52,
    color: '#171B2E',
    borderRadius: 26,
    backgroundColor: '#F9F9F9',
    paddingLeft: 16,
  },
  nametext: {
    color: '#171B2E',
    height: 18,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
  },
  botton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#6F3DE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 97,
  },
  botton2: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#6F3DE9',
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
  },
});
