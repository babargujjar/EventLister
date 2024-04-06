import {launchImageLibrary} from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from './hooks';
import { LogOut } from '../store/slice/authSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import storage from "@react-native-firebase/storage"

const useProfile = () => {

  const dispatch = useAppDispatch();
  const [imageURI, setImageURI] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [loading, setLoading] = useState(false);

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
       setLoading(true);
      if (!userData) {
        ToastAndroid.show('User data not available', ToastAndroid.SHORT);
        return;
      }
const displayNameChanged = userData.displayName !== displayName;
    const photoURLChanged = userData.photoURL !== imageURI;

    if (!displayNameChanged && !photoURLChanged) {
      ToastAndroid.show('Profile already updated', ToastAndroid.SHORT);
      return;
    }
       // Image upload to storage
    const imageRef = storage().ref(`profile_images/${userData.uid}_${Date.now()}`);
    await imageRef.putFile(imageURI);
    const imageUrl = await imageRef.getDownloadURL();

      await userData.updateProfile({
        displayName: displayName,
        photoURL: imageUrl,
      });
      setImageURI(imageUrl)
      const updatedUser = auth().currentUser;
      if (updatedUser) {
        await firestore()
          .collection('user')
          .doc(updatedUser.uid)
          .update({
            name: updatedUser.displayName,
            email: updatedUser.email,
            photoUrl: imageUrl || null,
            uid: updatedUser.uid,
          });
        ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    } finally {
      setLoading(false); // Loader ko hide karo
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
    setDisplayName,
    loading,
    setLoading

  }
}

export default useProfile