import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import img from '../../../assets/images/Google.png';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {Signup, googleSignin} from '../../../store/authSlice';
import SignUpStyle from './SignUpStyle';

const SignUp = ({navigation}: any) => {
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword]: any = useState('');

  const dispatch = useAppDispatch();

  const signup = async () => {
    try {
      if (!name || !email || !password) {
        ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
        return;
      } else {
        await dispatch(Signup({name, email, password}));
      }
    } catch (error) {
      ToastAndroid.show(
        'server error please try again later',
        ToastAndroid.SHORT,
      );
    }
  };

  const googleSignIn = async () => {
    dispatch(googleSignin());
  };

  return (
    <ScrollView style={SignUpStyle.page}>
      <Text style={SignUpStyle.heading}>Sign Up</Text>
      <View>
        <View style={SignUpStyle.inputview}>
          <Text style={SignUpStyle.nametext}>Name</Text>
          <View>
            <TextInput
              onChangeText={value => setName(value)}
              value={name}
              style={SignUpStyle.input}
              placeholder="Enter Name Here"
              keyboardType="default"
            />
          </View>
        </View>
        <View style={SignUpStyle.inputview}>
          <Text style={SignUpStyle.nametext}>Email</Text>
          <View>
            <TextInput
              onChangeText={value => setEmail(value)}
              value={email}
              style={SignUpStyle.input}
              placeholder="Enter Email Here"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={SignUpStyle.inputview}>
          <Text style={SignUpStyle.nametext}>Password</Text>
          <View>
            <TextInput
              style={SignUpStyle.input}
              onChangeText={value => setPassword(value)}
              value={password}
              placeholder="Enter Password Here"
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
      <Text style={SignUpStyle.alreadyaccount}>
        Already have an account?{'  '}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text style={{color: '#6F3DE9'}}>Login Instead</Text>
        </TouchableOpacity>
      </Text>
      <TouchableOpacity style={SignUpStyle.button} onPress={signup}>
        <Text style={SignUpStyle.text}>Create a New Account</Text>
      </TouchableOpacity>
      <View style={SignUpStyle.OR}>
        <View
          style={{borderBottomWidth: 1, borderColor: '#00000', flex: 1}}></View>
        <Text style={{color: '#171B2E', fontSize: 14}}>OR</Text>
        <View
          style={{borderBottomWidth: 1, borderColor: '#00000', flex: 1}}></View>
      </View>
      <View style={SignUpStyle.imgview}>
        <TouchableOpacity onPress={googleSignIn}>
          <Image style={SignUpStyle.image} source={img} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;


