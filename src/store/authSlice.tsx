import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import firestore from "@react-native-firebase/firestore"


const initialState: any = {
  user: null,
  loading: false,
  error: null,
};

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '892470911449-gjd16tcofmgd710ds85i1fvlors4nca0.apps.googleusercontent.com',
    });
  }, []);


export const Signup = createAsyncThunk ("auth/Signup",async ({name,email,password}:any)=>{
  try {
    if (!name || !email || !password) {
      ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
      return;
    }

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
         auth().currentUser?.updateProfile({
           displayName: name,
         });
         ToastAndroid.show(
           'User Created Successfully!',
           ToastAndroid.SHORT,
         );
      });
      const userDocs = firestore()
        .collection('user')
        .doc(auth()?.currentUser?.uid)
        .get()
        if(!(await userDocs).exists){
          firestore()
            .collection('user')
            .doc(auth()?.currentUser?.uid)
            .set({
              name: auth()?.currentUser?.displayName,
              email: auth()?.currentUser?.email,
              photoUrl: auth()?.currentUser?.photoURL || null,
              uid: auth()?.currentUser?.uid,
              
            })}

  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      ToastAndroid.show('That email address is already in use!',ToastAndroid.SHORT);
    } else if (error.code === 'auth/invalid-email') {
      ToastAndroid.show('That email address is invalid!',ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Something went wrong. Please try again.',ToastAndroid.SHORT);
    }
  }
})


export const Signin = createAsyncThunk("auth/signin" ,async({email,password}:any)=>{
  try {
    if ( !email || !password) {
  ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT);
  return;
}

    await auth()
      .signInWithEmailAndPassword(
        email,
        password,
      )
      .then(() => {
        ToastAndroid.show('User signedin Successfully!',ToastAndroid.SHORT);
      })
  } catch (error:any) {

    if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('This email address is already in use!',ToastAndroid.SHORT);
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Password and E-mail address is invalid!',ToastAndroid.SHORT);
        }else{
          ToastAndroid.show(
            'Password and E-mail address is invalid!',
            ToastAndroid.SHORT,
          );}
  }
})

export const googleSignin = createAsyncThunk("GoogleSignin" ,async ()=>{
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      const userDocs = firestore()
        .collection('user')
        .doc(auth()?.currentUser?.uid)
        .get()
        if(!(await userDocs).exists){
          firestore()
            .collection('user')
            .doc(auth()?.currentUser?.uid)
            .set({
              name: auth()?.currentUser?.displayName,
              email: auth()?.currentUser?.email,
              photoUrl: auth()?.currentUser?.photoURL || null,
              uid: auth()?.currentUser?.uid,
              
            });
            
            ToastAndroid.show("New user signed up successfully!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("User signed in successfully!", ToastAndroid.SHORT);
    }
  } catch (error) {}
})

export const LogOut = createAsyncThunk<void, void>(
  'auth/LogOut',
  async (_, {dispatch}) => {
    try {
      await auth().signOut();
      dispatch(setUser(null));
      ToastAndroid.show('User signed out!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error as string, ToastAndroid.SHORT);
      ToastAndroid.show(
        'An error occurred while signing out. Please try again.',
        ToastAndroid.LONG,
      );
    }
  },
);

    
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      if (action.payload instanceof Function) {
        console.error('Trying to set a non-serializable value in setUser');
        return;
      }
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(Signup.pending, state => {
        state.loading = true;
      })
      .addCase(Signup.fulfilled, state => {
        state.loading = false;
      })
      .addCase(Signup.rejected, (state, action) => {
        (state.user = null), (state.loading = true);
        state.error = action.error.message || 'Signup failed Please Try Again';
      })
      .addCase(Signin.pending, state => {
        state.loading = true;
      })
      .addCase(Signin.fulfilled, state => {
        state.loading = false;
      })
      .addCase(Signin.rejected, (state, action) => {
        (state.user = null), (state.loading = true);
        state.error = action.error.message || 'Signin failed Please Try Again';
      })
      .addCase(googleSignin.pending, state => {
        state.loading = true;
      })
      .addCase(googleSignin.fulfilled, state => {
        state.loading = false;
      })
      .addCase(googleSignin.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error =
          action.payload || 'Google Signin failed. Please try again.';
      })
      .addCase(LogOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(LogOut.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Forget Password failed';
      });
  },
});



export const {setUser, setLoading, setError} = authSlice.actions;

export default authSlice.reducer;


