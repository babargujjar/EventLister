import {launchImageLibrary} from 'react-native-image-picker';
import { useAppDispatch } from './hooks';
import { LogOut } from '../store/authSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';

const useProfile = () => {

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
        ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
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
  return {
    logout,
    handleSelectImage,
    handleUpdateProfile,
    imageURI,
    userData,
    displayName,
    setDisplayName
  }
}

export default useProfile