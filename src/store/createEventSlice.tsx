import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CreateEventState, Eventslice} from '../constant/types';
import useCreateEvent from '../hooks/useCreateEvent';
import blank from "../assets/images/images.jpg"

const {
  setEventDate,
  setEventLocation,
  setEventMapURL,
  setPrice,
  setEventName,
  setImageURI,
} = useCreateEvent();

const initialState: CreateEventState = {
  event: null,
  loading: false,
  error: null,
};

export const UploadEvent = createAsyncThunk(
  'event/UploadEvent',
  async (eventData: Eventslice) => {
    try {
      let adminPhoto = blank; // Default to blank photo
      if (eventData.createdBy && eventData.createdBy.adminPhoto) {
        adminPhoto = eventData.createdBy.adminPhoto;
      }

      await firestore().collection('events').add({
        EventName: eventData.eventName,
        EventPrice: eventData.price,
        EventDate: eventData.eventDate,
        EventLocation: eventData.eventLocation,
        EventMapURL: eventData.eventMapURL,
        EventImage: eventData.imageURI,
        EventAdminUid: eventData.createdBy.uid,
        EventAdminName: eventData.createdBy.adminName,
        EventAdminPhoto: adminPhoto
      });
      ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
      setEventDate(''), setImageURI(''), setEventLocation('');
      setEventMapURL('');
      setPrice('');
      setEventName('');
    } catch (error: any) {
      ToastAndroid.show('Error creating event', ToastAndroid.SHORT);
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
