import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import arrowleft from "../../../assets/images/arrow-left.png"

const ResetPassword = ({navigation}:any) => {
  return (
    <ScrollView>
      <View style={Style.container}>
        <View style={Style.topview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={Style.topimgview}>
            <Image style={{width: 24, height: 24}} source={arrowleft} />
          </TouchableOpacity>
          <Text style={Style.topviewtext}>Reset Password</Text>
        </View>
        <View style={{marginBottom: 248}}>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Old Password</Text>
            <View>
              <TextInput
                style={Style.input}
                // defaultValue={state}
                placeholder="old password"
                placeholderTextColor="#171B2E"
                // onChangeText={inputHandler}
                // keyboardType="default"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>New Password</Text>
            <View>
              <TextInput
                style={Style.input}
                // defaultValue={state}
                placeholder="new password"
                placeholderTextColor="#171B2E"
                // onChangeText={inputHandler}
                // keyboardType="default"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={Style.inputview}>
            <Text style={Style.nametext}>Confirm New Password</Text>
            <View>
              <TextInput
                style={Style.input}
                // defaultValue={state}
                placeholder="confirm password"
                placeholderTextColor="#171B2E"
                // onChangeText={inputHandler}
                // keyboardType="default"
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={Style.botton}>
          <Text style={(Style.bottontext, {color: '#FFFFFF'})}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ResetPassword;



const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    // flex: 1,
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
    // marginTop: 97,
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
  },
});