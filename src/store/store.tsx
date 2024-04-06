import {configureStore} from '@reduxjs/toolkit';
import {LogOut, Signin, Signup, googleSignin} from './slice/authSlice';
import fetchEventsSlice from './slice/fetchEventsSlice';


export const store = configureStore({
  reducer: {
    SignIn: Signin,
    SignUp: Signup,
    googleSignIn: googleSignin,
    logOut: LogOut,
    eventsData: fetchEventsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// import {configureStore} from '@reduxjs/toolkit';
// import fetchEventsSlice from './slice/fetchEventsSlice';
// const store = configureStore({
//   reducer: {
//     events: fetchEventsSlice,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
