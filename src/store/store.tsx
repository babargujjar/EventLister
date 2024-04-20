import {configureStore} from '@reduxjs/toolkit';
import {LogOut, Signin, Signup, googleSignin} from './slice/authSlice';
import fetchEventsSlice from './slice/EventsSlice';
import eventsReducer  from './slice/EventsSlice';

export const store = configureStore({
  reducer: {
    SignIn: Signin,
    SignUp: Signup,
    googleSignIn: googleSignin,
    logOut: LogOut,
    eventsData: fetchEventsSlice,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
