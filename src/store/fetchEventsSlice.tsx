import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CreateEventState, Eventslice} from '../constant/types';
import storage from '@react-native-firebase/storage';

const initialState: any = {
  event: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, {rejectWithValue}) => {
    try {
      const eventsRef = firestore().collection('events');
      const snapshot = await eventsRef.get();
      const eventData: any[] = [];
      snapshot.forEach(doc => {
        eventData.push({id: doc.id, ...doc.data()});
      });
      return eventData;
    } catch (error:any) {
      return rejectWithValue('Error fetching events: ' + error.message);
    }
  },
);

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload || [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectEvents = (state: any) => state.events.events;
export const selectEventsLoading = (state: any) => state.events.loading;
export const selectEventsError = (state: any) => state.events.error;

export default eventSlice.reducer;
