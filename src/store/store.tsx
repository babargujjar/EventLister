import {configureStore} from '@reduxjs/toolkit';
import {LogOut, Signin, Signup, googleSignin} from './authSlice';



export const store = configureStore({
  reducer: {
    SignIn: Signin,
    SignUp: Signup,
    googleSignIn: googleSignin,
    logOut: LogOut,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
