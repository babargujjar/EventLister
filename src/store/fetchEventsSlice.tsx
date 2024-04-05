import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { EventsArray } from '../constant/types';

interface Event {
  id: string;
}

interface EventsState {
  events: EventsArray[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const eventsRef = firestore().collection('events');
    const snapshot = await eventsRef.get();
    const eventData: any = [];
    snapshot.forEach(doc => {
      eventData.push({id: doc.id, ...doc.data()});
    });
    return eventData;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; // Throw error to indicate that the thunk was rejected
  }
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any[] | null>) => {
      if (action.payload instanceof Function) {
        console.error('Trying to set a non-serializable value in setUser');
        return;
      }
      state.events = action.payload || [];
      state.loading = false;
      state.error = null;
    },
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
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching events';
      });
  },
});

export const {setUser, setLoading, setError} = eventsSlice.actions;

export default eventsSlice.reducer;

