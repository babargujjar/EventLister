import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useAppDispatch} from './hooks';
import {resetPassword} from '../store/slice/EventsSlice';

const useResetPassword = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const dispatch = useAppDispatch();

  const resetPasswords = async () => {
    try {
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
      ToastAndroid.show('good', ToastAndroid.SHORT);
      console.log('first', {currentPass, newPassword});
      await dispatch(resetPassword({currentPass, newPassword}));
    } catch (error) {
      ToastAndroid.show(
        'An error occurred try again later',
        ToastAndroid.SHORT,
      );
    }
  };

  return {
    resetPasswords,
    currentPass,
    setCurrentPass,
    newPassword,
    setNewPassword,
    confirmPass,
    setConfirmPass,
  };
};

export default useResetPassword;
