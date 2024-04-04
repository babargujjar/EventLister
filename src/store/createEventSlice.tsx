import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface Event {
  eventName: string;
  price: string;
  eventDate: string;
  eventLocation: string;
  eventMapURL: string;
  imageURI: string;
  createdBy: any;
}

interface CreateEventState {
  event: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: CreateEventState = {
  event: null,
  loading: false,
  error: null,
};

export const UploadEvent = createAsyncThunk(
  'event/UploadEvent',
  async (eventData: Event) => {
    try {

      await firestore().collection('events').add({
        EventName: eventData.eventName,
        EventPrice: eventData.price,
        EventDate: eventData.eventDate,
        EventLocation: eventData.eventLocation,
        EventMapURL: eventData.eventMapURL,
        EventImage: eventData.imageURI,
        EventAdminUid: eventData.createdBy.uid,
        EventAdminName: eventData.createdBy.adminName,
        EventAdminPhoto: eventData.createdBy.adminPhoto

      })
      ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
      
    } catch (error: any) {
      console.log('error', error);
      ToastAndroid.show('Error kiun creating event', ToastAndroid.SHORT);
    }
  },
);

export const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(UploadEvent.pending, state => {
        state.loading = true;
      })
      .addCase(UploadEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UploadEvent.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Event creation failed';
      });
  },
});

export const {setLoading, setError} = createEventSlice.actions;

export default createEventSlice.reducer;
