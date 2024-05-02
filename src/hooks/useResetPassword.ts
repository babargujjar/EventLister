import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useAppDispatch} from './hooks';
import {resetPassword} from '../store/slice/EventsSlice';

const useResetPassword = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading,setLoading] = useState(false)
  const dispatch = useAppDispatch();

  const resetPasswords = async () => {
    try {
      setLoading(true)
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
      await dispatch(resetPassword({currentPass, newPassword}));
      setLoading(false)
    } catch (error) {
      setLoading(true)
      ToastAndroid.show(
        'An error occurred try again later',
        ToastAndroid.SHORT,
      );
      setLoading(false)
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
    loading
  };
};

export default useResetPassword;
