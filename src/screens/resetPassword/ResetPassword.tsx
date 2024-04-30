import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import arrowleft from '../../assets/images/arrow-left.png';
import ResetPasswordStyle from './ResetPasswordStyle';
import useResetPassword from '../../hooks/useResetPassword';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const ResetPassword = ({navigation}: any) => {
  const {
    resetPasswords,
    currentPass,
    setCurrentPass,
    newPassword,
    setNewPassword,
    confirmPass,
    setConfirmPass,
  } = useResetPassword();

  return (
    <ScrollView>
      <View style={ResetPasswordStyle.container}>
        <View style={ResetPasswordStyle.topview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={ResetPasswordStyle.topimgview}>
            <Image style={{width: 24, height: 24}} source={arrowleft} />
          </TouchableOpacity>
          <Text style={ResetPasswordStyle.topviewtext}>Reset Password</Text>
        </View>
        <View style={{marginBottom: 248}}>
          <View style={ResetPasswordStyle.inputview}>
            <Text style={ResetPasswordStyle.nametext}>Old Password</Text>
            <View>
              <Input
                style={ResetPasswordStyle.input}
                value={currentPass}
                onChangeText={setCurrentPass}
                placeholder="Old Password"
                placeholderTextColor="#171B2E"
                secureTextEntry={true} keyboardType={undefined} editable={undefined} autoCorrect={false}              />
            </View>
          </View>
          <View style={ResetPasswordStyle.inputview}>
            <Text style={ResetPasswordStyle.nametext}>New Password</Text>
            <View>
              <Input
                style={ResetPasswordStyle.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                placeholderTextColor="#171B2E"
                secureTextEntry={true} keyboardType={undefined} editable={true} autoCorrect={false} />
            </View>
          </View>
          <View style={ResetPasswordStyle.inputview}>
            <Text style={ResetPasswordStyle.nametext}>
              Confirm New Password
            </Text>
            <View>
              <Input
                style={ResetPasswordStyle.input}
                value={confirmPass}
                onChangeText={setConfirmPass}
                placeholder="Confirm New Password"
                placeholderTextColor="#171B2E"
                secureTextEntry={true} keyboardType={undefined} editable={true} autoCorrect={false}              />
            </View>
          </View>
        </View>
        <Button
          style={ResetPasswordStyle.botton}
          onPress={resetPasswords}>
          <Text style={[ResetPasswordStyle.bottontext, {color: '#FFFFFF'}]}>
            Reset Password
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
