import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import editimg from '../../../assets/images/Discoveryfocused.png';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch} from '../../../hooks/hooks';
import {LogOut} from '../../../store/authSlice';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"


const Profile = ({navigation}: any) => {


  const dispatch = useAppDispatch();
  const [imageURI, setImageURI] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const userData: any = auth()?.currentUser;

  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || '');
      setImageURI(userData.photoURL || '');
    }
  }, []);

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

    const handleUpdateProfile = async () => {
      try {
        if (!userData) {
          ToastAndroid.show('User data not available', ToastAndroid.SHORT);
          return;
        }
        await userData.updateProfile({
          displayName: displayName,
          photoURL: imageURI,
        });
        const updatedUser = auth().currentUser;
        if (updatedUser) {
          await firestore()
            .collection('user')
            .doc(updatedUser.uid)
            .update({
              name: updatedUser.displayName,
              email: updatedUser.email,
              photoUrl: updatedUser.photoURL || null,
              uid: updatedUser.uid,
            });
          ToastAndroid.show(
            'Profile updated successfully!',
            ToastAndroid.SHORT,
          );
        } else {
          ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
      }
    };


  const logout = async () => {
    dispatch(LogOut());
  };

  return (
    <ScrollView>
      <View style={Style.container}>
        <View style={Style.headingview}>
          <Text style={Style.heading}>Profile Settings</Text>
          <TouchableOpacity style={Style.logoutview} onPress={logout}>
            <Text style={Style.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleSelectImage} style={Style.imgview}>
            {imageURI ? (
              <Image
                style={{width: '100%', height: '100%', borderRadius: 71}}
                source={{uri: imageURI}}
              />
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
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Email</Text>
            <View>
              <TextInput
                style={Style.input}
                value={userData ? userData?.email : ''}
                placeholder="Email"
                placeholderTextColor="#171B2E"
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={Style.botton} onPress={handleUpdateProfile}>
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
