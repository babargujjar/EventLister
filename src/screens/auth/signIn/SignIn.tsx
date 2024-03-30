import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid
} from 'react-native';
import React, {useEffect, useState} from 'react';
import img from "../../../assets/images/Google.png"
import { Signin, googleSignin } from '../../../store/authSlice';
import {useAppDispatch} from '../../../hooks/hooks';


const SignIn = ({navigation}:any) => {

   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
   const [userInfo, setUserInfo]: any = useState(null);

  const dispatch = useAppDispatch()
  
  const signin = async () => {
    try {
      if (!email || !password) {
        ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
        return;
      } else {
        await dispatch(Signin({email, password}));
      }
    } catch (error) {
      console.log('slice not work');
    }
  };
 

  const googleSignIn = () => {
     dispatch(googleSignin())
  
   };
  // console.log(userInfo)
  return (
    <ScrollView style={Styles.page}>
      <View>
        <Text style={Styles.heading}>Sign In</Text>
        <View>
          <View style={Styles.inputview}>
            <Text style={Styles.nametext}>Email</Text>
            <View>
              <TextInput
                style={Styles.input}
                // defaultValue={state}
                placeholder="Enter Email Here"
                // onChangeText={inputHandler}
                keyboardType="email-address"
                onChangeText={value => setEmail(value)}
                value={email}
              />
            </View>
          </View>
          <View style={Styles.inputview}>
            <Text style={Styles.nametext}>Password</Text>
            <View>
              <TextInput
                style={Styles.input}
                onChangeText={value => setPassword(value)}
                value={password}
                // defaultValue={state}
                placeholder="Enter Password Here"
                // onChangeText={inputHandler}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
        <Text style={Styles.alreadyaccount}>
          Don't have an account?{'  '}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: '#6F3DE9'}}>SignUp Instead</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={signin}>
          <Text style={Styles.text}>Sign In</Text>
        </TouchableOpacity>
        <View style={Styles.OR}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#00000',
              flex: 1,
            }}></View>
          <Text style={{color: '#171B2E', fontSize: 14}}>OR</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#00000',
              flex: 1,
            }}></View>
        </View>
        <TouchableOpacity style={Styles.imgview} onPress={googleSignIn}>
          <Image style={Styles.image} source={img} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const Styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    color: '#171B2E',
    height: 812,
    // width: 375,
    marginHorizontal: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    color: '#171B2E',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 41.6,
    alignItems: 'center',
    textAlign: 'center',
    height: 42,
    marginTop: 75,
    marginBottom: 138,
  },
  inputview: {
    height: 82,
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
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
  alreadyaccount: {
    color: '#171B2E',
    marginLeft: 20,
    width: 303,
    height: 19,
    lineHeight: 19.2,
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#6F3DE9',
    marginBottom: 24,
    alignItems: 'center',
    borderRadius: 28,
    paddingTop: 15,
    paddingBottom: 15,
    // objectFit:'cover',
    height: 52,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
  },
  OR: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    lineHeight: 14,
    fontWeight: '500',
  },
  imgview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 48,
    marginTop: 24,
    height: 48,
    backgroundColor: '#EDEDED',
    borderRadius:100,
    padding:10
  },
});
