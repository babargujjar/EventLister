import {configureStore} from '@reduxjs/toolkit';
import {LogOut, Signin, Signup, googleSignin} from './authSlice';
import eventsReducer from "./fetchEventsSlice"
import { UploadEvent } from './createEventSlice';



export const store = configureStore({
  reducer: {
    SignIn: Signin,
    SignUp: Signup,
    googleSignIn: googleSignin,
    logOut: LogOut,
    event: eventsReducer,
    // uploadEvent:UploadEvent,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
