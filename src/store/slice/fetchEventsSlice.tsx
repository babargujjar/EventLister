import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {EventsArray} from '../../constant/types';

interface InitialState {
  events: EventsArray[];
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, {dispatch}) => {
    try {
      const eventsRef = firestore().collection('events');

      const snapshot = await eventsRef.get();

      const eventData: EventsArray[] = [];

      snapshot.forEach(async doc => {
        const event = doc.data();
        if (
          event.EventImage &&
          (event.EventImage.startsWith('gs://') ||
            event.EventImage.startsWith('https://'))
        ) {
          event.EventImageURL = event.EventImage;
        } else {
          const imageRef = storage().ref().child(event.EventImage);
          try {
            const downloadURL = await imageRef.getDownloadURL();
            event.EventImageURL = downloadURL;
          } catch (error) {
            console.error(
              `Error fetching image URL for event: ${doc.id}`,
              error,
            );
          }
        }
        eventData.push({id: doc.id, ...event}as any);
      });

      dispatch(setEvents(eventData));
      // console.log('eventData', eventData)
    } catch (error) {
      console.error('Error fetching events: ', error);
      throw error;
    }
  },
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, state => {
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setEvents} = eventSlice.actions;

export default eventSlice.reducer;

