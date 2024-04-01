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
  //   id: any;
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

const AddEvent = async (eventData: Event) => {
  try {
    console.log('eventdata', eventData);

    // Validate all fields
    if (
      !eventData.eventName ||
      !eventData.price ||
      !eventData.eventDate ||
      !eventData.eventLocation ||
      !eventData.eventMapURL ||
      !eventData.imageURI
      // !id
    ) {
      ToastAndroid.show('Please Enter all fields', ToastAndroid.SHORT);
    }

    const isValidDate =
      /^([0-9]{2})\s(January|February|March|April|May|June|July|August|September|October|November|December)\s([0-9]{4})$/.test(
        eventData.eventDate,
      );

    if (!isValidDate) {
      throw new Error('Please enter a valid date format (dd Month yyyy)');
    }

    // Add event to Firestore
    await firestore().collection('events').add({
      EventName: eventData.eventName,
      EventPrice: eventData.price,
      EventDate: eventData.eventDate,
      EventLocation: eventData.eventLocation,
      EventMapURL: eventData.eventMapURL,
      EventImage: eventData.imageURI,

      //   Eventid: id,
    });

    return eventData; // Return the event data if successful
  } catch (error) {
    throw error; // Throw an error if there's any issue
  }
};

const isValidDateFormat = (dateString: string): boolean => {
  const pattern =
    /^(0?[1-9]|[12][0-9]|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;
  return pattern.test(dateString);
};

export const UploadEvent = createAsyncThunk(
  'event/UploadEvent',
  async (eventData: Event) => {
    try {
      if (
        !eventData.eventName
        // !eventData.price ||
        // !eventData.eventDate ||
        // !eventData.eventLocation ||
        // !eventData.eventMapURL ||
        // !eventData.imageURI ||
        // !eventData.createdBy.uid ||
        // !eventData.createdBy.adminName ||
        // !eventData.createdBy.adminPhoto
      ) {
        ToastAndroid.show('Please Enter all fields', ToastAndroid.SHORT);
      }
       console.log('evnt data', eventData);

      //    if (!isValidDateFormat(eventData.eventDate)) {
      //      throw new Error('Please enter a valid date format (dd Month yyyy)');
      //    }

      // Add event to Firestore
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
