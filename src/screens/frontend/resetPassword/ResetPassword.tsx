// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import arrowleft from "../../../assets/images/arrow-left.png"
// import { firebase } from '@react-native-firebase/firestore'

// const ResetPassword = ({navigation}:any) => {
//    const [currentPass,setCurrentPass] = useState("")
//    const [newPassword,setNewPassword] = useState("")
//    const [confirmPass,setConfirmPass] = useState("")
//    const [newPass,setNewPass] = useState("")


// {
//   if(newPassword===confirmPass){
//     setNewPass(confirmPass)
//   }else{
//     console.log("please enter same password")
//   }
// }




// //   const resetPassword= ()=>{
// //     // const currentPass = window.prompt('Please enter current password');
// // try {
// //   const emailCred  = firebase.auth.EmailAuthProvider.credential(
// //     firebase.auth().currentUser? , currentPass);
// // firebase.auth().currentUser?.reauthenticateWithCredential(emailCred)
// //     .then(() => {
// //       return firebase.auth().currentUser?.updatePassword(newPass);
// //     })
// // } catch (error) {
  
// // }
    
// //   }

// const resetPassword = () => {
//   try {
//     const currentUser = firebase.auth().currentUser;
//     if (!currentUser) {
//       // Handle the case where currentUser is null
//       console.error('No user is currently logged in.');
//       return;
//     }

//     if (!currentPass) {
//       // Handle the case where current password is not provided
//       console.error('Current password is required.');
//       return;
//     }

//     const emailCred = firebase.auth.EmailAuthProvider.credential(
//       currentUser.email, // Use currentUser's email
//       currentPass,
//     );

//     currentUser
//       .reauthenticateWithCredential(emailCred)
//       .then(() => {
//         // Assuming newPass is defined elsewhere
//         return currentUser.updatePassword(newPass);
//       })
//       .then(() => {
//         console.log('Password updated successfully!');
//       })
//       .catch(error => {
//         console.error('Error updating password:', error);
//       });
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// };








//   return (
//     <ScrollView>
//       <View style={Style.container}>
//         <View style={Style.topview}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={Style.topimgview}>
//             <Image style={{width: 24, height: 24}} source={arrowleft} />
//           </TouchableOpacity>
//           <Text style={Style.topviewtext}>Reset Password</Text>
//         </View>
//         <View style={{marginBottom: 248}}>
//           <View style={Style.inputview}>
//             <Text style={Style.nametext}>Old Password</Text>
//             <View>
//               <TextInput
//                 style={Style.input}
//                 value={currentPass}
//                 onChangeText={value =>setCurrentPass(value)}
//                 // defaultValue={state}
//                 placeholder="old password"
//                 placeholderTextColor="#171B2E"
//                 // onChangeText={inputHandler}
//                 // keyboardType="default"
//                 secureTextEntry={true}
//               />
//             </View>
//           </View>
//           <View style={Style.inputview}>
//             <Text style={Style.nametext}>New Password</Text>
//             <View>
//               <TextInput
//                 style={Style.input}
//                 value={newPassword}
//                 onChangeText={value =>setNewPassword(value)}
//                 // defaultValue={state}
//                 placeholder="new password"
//                 placeholderTextColor="#171B2E"
//                 // onChangeText={inputHandler}
//                 // keyboardType="default"
//                 secureTextEntry={true}
//               />
//             </View>
//           </View>
//           <View style={Style.inputview}>
//             <Text style={Style.nametext}>Confirm New Password</Text>
//             <View>
//               <TextInput
//                 style={Style.input}
//                 value={confirmPass}
//                 onChangeText={value =>setConfirmPass(value)}
//                 // defaultValue={state}
//                 placeholder="confirm password"
//                 placeholderTextColor="#171B2E"
//                 // onChangeText={inputHandler}
//                 // keyboardType="default"
//                 secureTextEntry={true}
//               />
//             </View>
//           </View>
//         </View>
//         <TouchableOpacity style={Style.botton} onPress={resetPassword}>
//           <Text style={(Style.bottontext, {color: '#FFFFFF'})}>
//             Reset Password
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// export default ResetPassword;



// const Style = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     // flex: 1,
//     paddingHorizontal: 20,
//   },
//   topview: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFFFFF',
//     marginTop: 32,
//     height: 42,
//     paddingRight: 120,
//     alignItems: 'center',
//     marginBottom: 74,
//   },
//   topviewtext: {
//     color: '#171B2E',
//     lineHeight: 18,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   topimgview: {
//     borderWidth: 1,
//     borderColor: '#EFF0F9',
//     width: 42,
//     height: 42,
//     borderRadius: 40,
//     padding: 9,
//   },
//   inputview: {
//     height: 82,
//     flexDirection: 'column',
//     gap: 12,
//     marginBottom: 18,
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
//   botton: {
//     height: 52,
//     borderRadius: 28,
//     backgroundColor: '#6F3DE9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     // marginTop: 97,
//   },
//   bottontext: {
//     fontWeight: '600',
//     fontSize: 14,
//     lineHeight: 18,
//   },
// });


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
        console.error('All password fields are required.');
        return;
      }

      if (newPassword !== confirmPass) {
        console.error('New password and confirm password must match.');
        return;
      }

      const emailCred = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPass,
      );

      
      currentUser
        .reauthenticateWithCredential(emailCred)
        .then(() => currentUser.updatePassword(newPassword))
        .then(() => console.log('Password updated successfully!'))
        .catch(error => console.error('Error updating password:', error));
    } catch (error) {
      console.error('An error occurred:', error);
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
