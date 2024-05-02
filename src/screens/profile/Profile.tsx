import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import editimg from '../../assets/images/Discoveryfocused.png';
import ProfileStyle from './ProfileStyle';
import useProfile from '../../hooks/useProfile';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const Profile = ({navigation}: any) => {
  const {
    logout,
    handleSelectImage,
    handleUpdateProfile,
    imageURI,
    userData,
    displayName,
    setDisplayName,
    loading,
    setLoading,
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
              <Input
                style={ProfileStyle.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="User Name"
                placeholderTextColor="#171B2E"
                keyboardType="default"
                secureTextEntry={false}
                editable={true} autoCorrect={false}              />
            </View>
          </View>
        </View>

        <View>
          <View style={ProfileStyle.inputview}>
            <Text style={ProfileStyle.nametext}>Email</Text>
            <View>
              <Input
                style={ProfileStyle.input}
                value={userData ? userData?.email : ''}
                placeholder="Email"
                placeholderTextColor="#171B2E"
                keyboardType="email-address"
                secureTextEntry={false}
                onChangeText={() => { } }
                editable={true} autoCorrect={false}              />
            </View>
          </View>
        </View>
        {loading && (
          <View style={ProfileStyle.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Button
          style={ProfileStyle.botton}
          onPress={handleUpdateProfile}>
          <Text style={(ProfileStyle.bottontext, {color: '#FFFFFF'})}>
            Update Profile
          </Text>
        </Button>
        <Button
          style={ProfileStyle.botton2}
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}>
          <Text style={(ProfileStyle.bottontext, {color: '#6F3DE9'})}>
            Reset Password
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Profile;
