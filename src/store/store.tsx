import {configureStore} from '@reduxjs/toolkit';
import {LogOut, Signin, Signup, googleSignin} from './authSlice';
import { fetchEvents } from './fetchEventsSlice';



export const store = configureStore({
  reducer: {
    SignIn: Signin,
    SignUp: Signup,
    googleSignIn: googleSignin,
    logOut: LogOut,
    events :fetchEvents,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
