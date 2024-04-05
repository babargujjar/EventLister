import {firebase} from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

const useResetPassword = () => {
      const [currentPass, setCurrentPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const resetPassword = () => {
        try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        console.error('No user is currently logged in.');
        return;
      }

      if (!currentPass || !newPassword || !confirmPass) {
        ToastAndroid.show(
          'All password fields are required.',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (newPassword !== confirmPass) {
        ToastAndroid.show(
          'New password and confirm password must match.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const userEmail = currentUser.email;
      if (!userEmail) {
        ToastAndroid.show('User email is not available!', ToastAndroid.SHORT);
        return;
      }

      const emailCred = firebase.auth.EmailAuthProvider.credential(
        userEmail,
        currentPass,
      );

      currentUser
        .reauthenticateWithCredential(emailCred)
        .then(() => currentUser.updatePassword(newPassword))
        .then(() =>
          ToastAndroid.show(
            'Password updated successfully!',
            ToastAndroid.SHORT,
          ),
        )
        .catch(error =>
          ToastAndroid.show(
            'Error updating password please try again later',
            ToastAndroid.SHORT,
          ),
        );
    } catch (error) {
      ToastAndroid.show(
        'An error occurred try again later',
        ToastAndroid.SHORT,
      );
    }
  };

  return {
    resetPassword,
    currentPass,
    setCurrentPass,
    newPassword,
    setNewPassword,
    confirmPass,
    setConfirmPass
  }
}

export default useResetPassword