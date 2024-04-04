import React, {useState} from 'react';
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
import arrowleft from '../../../assets/images/arrow-left.png';
import {firebase} from '@react-native-firebase/firestore';

const ResetPassword = ({navigation}: any) => {
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

  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.topimgview}>
            <Image style={{width: 24, height: 24}} source={arrowleft} />
          </TouchableOpacity>
          <Text style={styles.topviewtext}>Reset Password</Text>
        </View>
        <View style={{marginBottom: 248}}>
          <View style={styles.inputview}>
            <Text style={styles.nametext}>Old Password</Text>
            <View>
              <TextInput
                style={styles.input}
                value={currentPass}
                onChangeText={setCurrentPass}
                placeholder="Old Password"
                placeholderTextColor="#171B2E"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.nametext}>New Password</Text>
            <View>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                placeholderTextColor="#171B2E"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.inputview}>
            <Text style={styles.nametext}>Confirm New Password</Text>
            <View>
              <TextInput
                style={styles.input}
                value={confirmPass}
                onChangeText={setConfirmPass}
                placeholder="Confirm New Password"
                placeholderTextColor="#171B2E"
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.botton} onPress={resetPassword}>
          <Text style={[styles.bottontext, {color: '#FFFFFF'}]}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    height: 42,
    paddingRight: 120,
    alignItems: 'center',
    marginBottom: 74,
  },
  topviewtext: {
    color: '#171B2E',
    lineHeight: 18,
    fontWeight: '600',
    fontSize: 14,
  },
  topimgview: {
    borderWidth: 1,
    borderColor: '#EFF0F9',
    width: 42,
    height: 42,
    borderRadius: 40,
    padding: 9,
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
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ResetPassword;
