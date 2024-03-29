// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image
// } from 'react-native';
// import img from '../../../assets/images/Google.png';
// import React, {useEffect, useState} from 'react';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import firestore from "@react-native-firebase/firestore"

// const SignUp = ({navigation}:any) => {

//    const [userInfo, setUserInfo]: any = useState(null);
//    const [name,setName]:any = useState("")
//    const [email,setEmail]:any = useState("")
//    const [password,setPassword]:any = useState("")

// const signup =async () => {
//   try {
//   const credential = await auth()
//     // .createUserWithEmailAndPassword(email, password)
//     //  const user = credential.user
//     //  console.log("user signed up successfully",user)

//     .createUserWithEmailAndPassword(email, password)
//     .then(() => {
//       auth().currentUser?.updateProfile({
//         displayName: name,
//       });
//       firestore().collection('user').doc(auth()?.currentUser?.uid).set({
//         displayName:name,
//         email: email,
//         photoUrl: 'https://via.placeholder.com/52x52',
//         uid: auth().currentUser?.uid,
//       });
//     });
//    console.log('user signed up successfully');

//     // .then(() => {
//     //   console.log(auth().currentUser);
//     // })
//     // .catch(error => {
//     //   if (error.code === 'auth/email-already-in-use') {
//     //     console.log('That email address is already in use!');
//     //   }

//     //   if (error.code === 'auth/invalid-email') {
//     //     console.log('That email address is invalid!');
//     //   }

//       console.error('somthing went wrong');
//     ;
// } catch (error:any) {
  
//   if (error.code === 'auth/email-already-in-use') {
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         console.log('That email address is invalid!');
//       }else{
// console.log('try again');
//       }
// }
// }


// console.log({'name': name,'email': email,'password': password})


//    useEffect(() => {
//      GoogleSignin.configure({
//        webClientId:
//          '892470911449-gjd16tcofmgd710ds85i1fvlors4nca0.apps.googleusercontent.com',
//      });
//    }, []);
//    const googleSignIn = async () => {
//      try {
//        await GoogleSignin.hasPlayServices({
//          showPlayServicesUpdateDialog: true,
//        });

//        const {idToken} = await GoogleSignin.signIn();
//        console.log('id token', idToken);

//        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//        console.log('googlecredintial', googleCredential);
//        const userData = await auth().signInWithCredential(googleCredential);
//        navigation.navigate('Home');
//        setUserInfo(userData);
//        // console.log(userData)
//        return userData;
//      } catch (error) {
//        console.log('Somthing Went Wrong');
//      }
//    };


//   return (
//     <ScrollView style={Styles.page}>
//       <Text style={Styles.heading}>Sign Up</Text>
//       <View>
//         <View style={Styles.inputview}>
//           <Text style={Styles.nametext}>Name</Text>
//           <View>
//             <TextInput
//               onChangeText={value => setName(value)}
//               value={name}
//               style={Styles.input}
//               placeholder="Enter Name Here"
//               keyboardType="default"
//             />
//           </View>
//         </View>
//         <View style={Styles.inputview}>
//           <Text style={Styles.nametext}>Email</Text>
//           <View>
//             <TextInput
//               onChangeText={value => setEmail(value)}
//               value={email}
//               style={Styles.input}
//               placeholder="Enter Email Here"
//               keyboardType="email-address"
              
//             />
//           </View>
//         </View>
//         <View style={Styles.inputview}>
//           <Text style={Styles.nametext}>Password</Text>
//           <View>
//             <TextInput
//               style={Styles.input}
//               onChangeText={value => setPassword(value)}
//               value={password}
//               placeholder="Enter Password Here"
//               secureTextEntry={true}
//             />
//           </View>
//         </View>
//       </View>
//       <Text style={Styles.alreadyaccount}>
//         already have an account?{'  '}
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('SignIn');
//           }}>
//           <Text style={{color: '#6F3DE9'}}>Login Instead</Text>
//         </TouchableOpacity>
//       </Text>
//       <TouchableOpacity
//         style={Styles.button}
//         onPress={signup}>
//         <Text style={Styles.text}>Create a New Account</Text>
//       </TouchableOpacity>
//       <View style={Styles.OR}>
//         <View
//           style={{borderBottomWidth: 1, borderColor: '#00000', flex: 1}}></View>
//         <Text style={{color: '#171B2E', fontSize: 14}}>OR</Text>
//         <View
//           style={{borderBottomWidth: 1, borderColor: '#00000', flex: 1}}></View>
//       </View>
//       <View style={Styles.imgview}>
//         <TouchableOpacity onPress={googleSignIn}>
//           <Image style={Styles.image} source={img} />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignUp;

// const Styles = StyleSheet.create({
//   page: {
//     backgroundColor: '#FFFFFF',
//     color: '#171B2E',
//     height: 812,
//     // width: 375,
//     marginHorizontal: 'auto',
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   heading: {
//     color: '#171B2E',
//     fontWeight: '600',
//     fontSize: 32,
//     lineHeight: 41.6,
//     alignItems: 'center',
//     textAlign: 'center',
//     height: 42,
//     marginTop: 75,
//     marginBottom: 40,
//   },
//   inputview: {
//     height: 82,
//     flexDirection: 'column',
//     gap: 12,
//     marginBottom: 16,
//   },
//   input: {
//     height: 52,
//     color: '#171B2E',
//     borderRadius: 26,
//     backgroundColor: '#F9F9F9',
//     paddingLeft: 16,
//   },
//   nametext: {
//     color: '#171B2E',
//     height: 18,
//     marginBottom: 5,
//     fontSize: 14,
//     fontWeight: '600',
//     lineHeight: 18.2,
//   },
//   alreadyaccount: {
//     color: '#171B2E',
//     marginLeft: 20,
//     width: 303,
//     height: 19,
//     lineHeight: 19.2,
//     fontWeight: '500',
//     fontSize: 12,
//     marginBottom: 48,
//   },
//   button: {
//     backgroundColor: '#6F3DE9',
//     marginBottom: 24,
//     alignItems: 'center',
//     borderRadius: 28,
//     paddingTop: 15,
//     paddingBottom: 15,
//     // objectFit:'cover',
//     height: 52,
//   },
//   text: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//     lineHeight: 18.2,
//   },
//   OR: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 5,
//     lineHeight: 14,
//     fontWeight: '500',
//   },
//   imgview: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 48,
//     marginTop: 24,
//     height: 48,
//     backgroundColor: '#EDEDED',
//     borderRadius: 100,
//     padding: 10,
//   },
// });


import React, { useEffect, useState } from 'react';
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
import img from '../../../assets/images/Google.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from "@react-native-firebase/firestore";

const SignUp = ({ navigation }: any) => {
  const [userInfo, setUserInfo]: any = useState(null);
  const [name, setName]: any = useState("");
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");

  const signup = async () => {
    try {

      if (!name || !email || !password) {
        ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
        return;
      }

      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed up!');
          // navigation.navigate('SignIn');
        });
      // const credential = await auth().createUserWithEmailAndPassword(email, password);
      // const db = firestore()
      // await db.collection("users").add({email,password,name})
      //  await auth().currentUser?.updateProfile({
      //   displayName: name,
      // });
      // await firestore().collection('user').doc(auth()?.currentUser?.uid).set({
      //   displayName: name,
      //   email: email,
      //   photoUrl: 'https://via.placeholder.com/52x52',
      //   uid: auth().currentUser?.uid,
      // });
      // console.log('User signed up successfully');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.log('Something went wrong. Please try again.');
      }
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '892470911449-gjd16tcofmgd710ds85i1fvlors4nca0.apps.googleusercontent.com',
    });
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      console.log('id token', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('googlecredential', googleCredential);
      const userData = await auth().signInWithCredential(googleCredential);
      navigation.navigate('Home');
      setUserInfo(userData);
      return userData;
    } catch (error) {
      console.log('Something Went Wrong');
    }
  };
console.log(name,email,password)
  return (
    <ScrollView style={Styles.page}>
      <Text style={Styles.heading}>Sign Up</Text>
      <View>
        <View style={Styles.inputview}>
          <Text style={Styles.nametext}>Name</Text>
          <View>
            <TextInput
              onChangeText={value => setName(value)}
              value={name}
              style={Styles.input}
              placeholder="Enter Name Here"
              keyboardType="default"
            />
          </View>
        </View>
        <View style={Styles.inputview}>
          <Text style={Styles.nametext}>Email</Text>
          <View>
            <TextInput
              onChangeText={value => setEmail(value)}
              value={email}
              style={Styles.input}
              placeholder="Enter Email Here"
              keyboardType="email-address"
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
              placeholder="Enter Password Here"
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
      <Text style={Styles.alreadyaccount}>
        Already have an account?{'  '}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text style={{ color: '#6F3DE9' }}>Login Instead</Text>
        </TouchableOpacity>
      </Text>
      <TouchableOpacity
        style={Styles.button}
        onPress={signup}>
        <Text style={Styles.text}>Create a New Account</Text>
      </TouchableOpacity>
      <View style={Styles.OR}>
        <View style={{ borderBottomWidth: 1, borderColor: '#00000', flex: 1 }}></View>
        <Text style={{ color: '#171B2E', fontSize: 14 }}>OR</Text>
        <View style={{ borderBottomWidth: 1, borderColor: '#00000', flex: 1 }}></View>
      </View>
      <View style={Styles.imgview}>
        <TouchableOpacity onPress={googleSignIn}>
          <Image style={Styles.image} source={img} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    color: '#171B2E',
    height: 812,
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
    marginBottom: 40,
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
    borderRadius: 100,
    padding: 10,
  },
});
