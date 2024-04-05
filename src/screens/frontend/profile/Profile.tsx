import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import editimg from '../../../assets/images/Discoveryfocused.png';
import images from '../../../assets/images/images.jpg';
import ProfileStyle from './ProfileStyle';
import useProfile from '../../../hooks/useProfile';

const Profile = ({navigation}: any) => {
  const {
    logout,
    handleSelectImage,
    handleUpdateProfile,
    imageURI,
    userData,
    displayName,
    setDisplayName,
  } = useProfile();

  return (
    <ScrollView>
      <View style={ProfileStyle.container}>
        <View style={ProfileStyle.headingview}>
          <Text style={ProfileStyle.heading}>Profile Settings</Text>
          <TouchableOpacity style={ProfileStyle.logoutview} onPress={logout}>
            <Text style={ProfileStyle.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={handleSelectImage}
            style={ProfileStyle.imgview}>
            {imageURI ? (
              <Image
                style={{width: '100%', height: '100%', borderRadius: 71}}
                source={{uri: imageURI}}
              />
            ) : (
              <Image style={ProfileStyle.editimg} source={editimg} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View style={ProfileStyle.inputview}>
            <Text style={ProfileStyle.nametext}>Name</Text>
            <View>
              <TextInput
                style={ProfileStyle.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="User Name"
                placeholderTextColor="#171B2E"
                keyboardType="default"
              />
            </View>
          </View>
        </View>

        <View>
          <View style={ProfileStyle.inputview}>
            <Text style={ProfileStyle.nametext}>Email</Text>
            <View>
              <TextInput
                style={ProfileStyle.input}
                value={userData ? userData?.email : ''}
                placeholder="Email"
                placeholderTextColor="#171B2E"
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={ProfileStyle.botton}
          onPress={handleUpdateProfile}>
          <Text style={(ProfileStyle.bottontext, {color: '#FFFFFF'})}>
            Update Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ProfileStyle.botton2}
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}>
          <Text style={(ProfileStyle.bottontext, {color: '#6F3DE9'})}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
