// import {ToastAndroid} from 'react-native';
// import {useState} from 'react';
// import {
//   launchImageLibrary,
//   ImagePickerResponse,
// } from 'react-native-image-picker';
// import auth from '@react-native-firebase/auth';
// import storage from '@react-native-firebase/storage';
// import firestore from '@react-native-firebase/firestore';
// import {useAppSelector} from '../../../store/hooks';
// export default function useUpdateProfile() {
//   const UserData = useAppSelector(state => state.currentUser.user);
//   const [email, setEmail] = useState(UserData?.email);
//   const [name, setName] = useState(UserData?.displayName || '');
//   const [imageURI, setImageURI] = useState(UserData?.imageURL);

//   const handleSelectImage = () => {
//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (
//         !response.didCancel &&
//         response.assets &&
//         response.assets.length > 0
//       ) {
//         const {uri} = response.assets[0];
//         if (uri) {
//           setImageURI(uri);
//         }
//       }
//     });
//   };

//   const uploadImageToStorage = async (uri: string | null) => {
//     try {
//       if (!uri) {
//         const downloadURL = imageURI;
//         return downloadURL;
//       }
//       const fileName = `${Date.now()}-image.jpg`;
//       const reference = storage().ref(`images/${fileName}`);
//       await reference.putFile(uri);
//       const downloadURL = await reference.getDownloadURL();
//       return downloadURL;
//     } catch (error) {
//       ToastAndroid.show('Failed to upload image', ToastAndroid.SHORT);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const currentUser = auth().currentUser;
//       await firestore().collection('user').doc(currentUser?.uid).update({
//         email,
//         displayName: name,
//       });
//       let imageURL = imageURI;
//       if (imageURI && imageURI.startsWith('file://')) {
//         imageURL = await uploadImageToStorage(imageURI);
//       }

//       await firestore().collection('user').doc(currentUser?.uid).update({
//         imageURL: imageURL,
//       });

//       ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
//     } catch (error) {
//       ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
//     }
//   };

//   return {
//     email,
//     setEmail,
//     name,
//     setName,
//     imageURI,
//     setImageURI,
//     handleSelectImage,
//     handleUpdateProfile,
//   };
// }

