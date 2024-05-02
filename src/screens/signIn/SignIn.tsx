import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import img from '../../assets/images/Google.png';
import {Signin, googleSignin} from '../../store/slice/authSlice';
import {useAppDispatch} from '../../hooks/hooks';
import SignInStyle from './SignInStyle';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const SignIn = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const signin = async () => {
    try {
      if (!email || !password) {
        ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
        return;
      } else {
        await dispatch(Signin({email, password}));
      }
    } catch (error) {
      ToastAndroid.show(
        'server error please try again later',
        ToastAndroid.SHORT,
      );
    }
  };

  const googleSignIn = () => {
    dispatch(googleSignin());
  };

  return (
    <ScrollView style={SignInStyle.page}>
      <View>
        <Text style={SignInStyle.heading}>Sign In</Text>
        <View>
          <View style={SignInStyle.inputview}>
            <Text style={SignInStyle.nametext}>Email</Text>
            <View>
              <Input
                style={SignInStyle.input}
                placeholder="Enter Email Here"
                keyboardType="email-address"
                onChangeText={(value: React.SetStateAction<string>) => setEmail(value)}
                value={email} placeholderTextColor={undefined} secureTextEntry={false} editable={true} autoCorrect={false}              />
            </View>
          </View>
          <View style={SignInStyle.inputview}>
            <Text style={SignInStyle.nametext}>Password</Text>
            <View>
              <Input
                style={SignInStyle.input}
                onChangeText={(value: React.SetStateAction<string>) => setPassword(value)}
                value={password}
                placeholder="Enter Password Here"
                secureTextEntry={true} placeholderTextColor={undefined} keyboardType={"password"} editable={true} autoCorrect={false}              />
            </View>
          </View>
        </View>
        <Text style={SignInStyle.alreadyaccount}>
          Don't have an account?{'  '}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: '#6F3DE9'}}>SignUp Instead</Text>
          </TouchableOpacity>
        </Text>
        <Button style={SignInStyle.button} onPress={signin}>
          <Text style={SignInStyle.text}>Sign In</Text>
        </Button>
        <View style={SignInStyle.OR}>
          <View style={SignInStyle.empty}></View>
          <Text style={{color: '#171B2E', fontSize: 14}}>OR</Text>
          <View style={SignInStyle.empty}></View>
        </View>
        <TouchableOpacity style={SignInStyle.imgview} onPress={googleSignIn}>
          <Image style={SignInStyle.image} source={img} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;