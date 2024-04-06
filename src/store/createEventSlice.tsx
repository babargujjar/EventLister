import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CreateEventState, Eventslice} from '../constant/types';
import useCreateEvent from '../hooks/useCreateEvent';
import storage from '@react-native-firebase/storage';
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

const uploadImageToStorageAndGetDownloadURL = async (
  imageURI: string,
): Promise<string> => {
  try {
    const response = await fetch(imageURI);
    const blob = await response.blob();
    const imageName = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const imageRef = storage().ref(`event_images/${imageName}`);
    await imageRef.put(blob);
    const downloadURL = await imageRef.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
};

// Async thunk to upload event data
export const UploadEvent = createAsyncThunk(
  'event/UploadEvent',
  async (eventData: Eventslice, {dispatch}) => {
    try {
      let imageURI = eventData.imageURI;
      // Check if the imageURI starts with file://
      if (imageURI.startsWith('file://')) {
        // If it does, upload the image to Firebase Storage and get the download URL
        const downloadURL = await uploadImageToStorageAndGetDownloadURL(
          imageURI,
        );
        // Update the imageURI with the download URL
        imageURI = downloadURL;
        // console.log('imageURI', imageURI)
      }

      await firestore().collection('events').add({
        EventName: eventData.eventName,
        EventPrice: eventData.price,
        EventDate: eventData.eventDate,
        EventLocation: eventData.eventLocation,
        EventMapURL: eventData.eventMapURL,
        EventImage: imageURI,
        EventAdminUid: eventData.createdBy.uid,
        EventAdminName: eventData.createdBy.adminName,
        EventAdminPhoto: eventData.createdBy.adminPhoto,
      });

      ToastAndroid.show('Event created successfully!', ToastAndroid.SHORT);
      setEventDate('');
      setImageURI('');
      setEventLocation('');
      setEventMapURL('');
      setPrice('');
      setEventName('');
    } catch (error: any) {
      console.error('Error creating event:', error);
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
