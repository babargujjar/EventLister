import {launchImageLibrary} from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from './hooks';
import { LogOut } from '../store/slice/authSlice';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { Linking, PermissionsAndroid, ToastAndroid } from 'react-native';
import { updateProfile } from '../store/slice/EventsSlice';

const useProfile = () => {

  const dispatch = useAppDispatch();
  const data = useAppSelector(state=>state.updateProfile.updateProfile)
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
           const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
             {
               title: 'Storage Permission',
               message: 'App needs access to your storage to update profile.',
               buttonNeutral: 'Ask Me Later',
               buttonNegative: 'Cancel',
               buttonPositive: 'OK',
             },
           );
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.show("good",ToastAndroid.SHORT)
             await updateprofile();
           } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
             ToastAndroid.show(
               'Storage permission denied. Profile update failed.',
               ToastAndroid.SHORT,
             );
           } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
             ToastAndroid.show(
               'Storage permission denied permanently. Please enable it from settings.',
               ToastAndroid.LONG,
             );
             Linking.openSettings();
           }
         } catch (error) {
           console.error('Error requesting storage permission:', error);
           ToastAndroid.show(
             'Error requesting storage permission. Profile update failed.',
             ToastAndroid.SHORT,
           );
         }
      };


      const updateprofile = async () => {
        try {
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
          console.log('first', displayName, imageURI);
          // Image upload to storage
        ToastAndroid.show('good very', ToastAndroid.SHORT);
         await dispatch(updateProfile({displayName, imageURI, setImageURI}));
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
    setDisplayName,
    loading,
    setLoading

  }
}

export default useProfile