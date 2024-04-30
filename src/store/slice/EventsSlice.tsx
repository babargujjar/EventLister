import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Event} from '../../constant/types';
import {ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
const userData: any = auth()?.currentUser;

interface initialState {
  events: Event[];
  event: Event[];
  loading: boolean;
  error: any;
  updateProfile: any;
}

const initialState: initialState = {
  events: [],
  event: [],
  loading: false,
  error: null,
  updateProfile: null,
};

export const setRealtimeEvents = (events: Event[]) => ({
  type: 'events/setRealtimeEvents',
  payload: events,
});

interface EventPostingState {
  uploadingImage: boolean;
  creatingEvent: boolean;
  error: string | null;
}

const initialEventPostingState: EventPostingState = {
  uploadingImage: false,
  creatingEvent: false,
  error: null,
};

export const fetchEvents = createAsyncThunk<Event[]>(
  'events/fetchEvents',
  async () => {
    const eventsRef = firestore().collection('events');

    return new Promise((resolve, reject) => {
      const unsubscribe = eventsRef.onSnapshot(
        snapshot => {
          const eventData: Event[] = [];
          snapshot.forEach(doc => {
            const event = doc.data();
            if (
              event.EventImage &&
              (event.EventImage.startsWith('gs://') ||
                event.EventImage.startsWith('https://'))
            ) {
              event.EventImageURL = event.EventImage;
            } else {
              const imageRef = storage().ref().child(event.EventImage);
              imageRef
                .getDownloadURL()
                .then(downloadURL => {
                  event.EventImageURL = downloadURL;
                  eventData.push({id: doc.id, ...event} as Event);
                })
                .catch(error => {
                  console.error(
                    `Error fetching image URL for event: ${doc.id}`,
                    error,
                  );
                  reject(error);
                });
            }
            eventData.push({id: doc.id, ...event} as Event);
          });
          resolve(eventData);
        },
        error => {
          console.error('Error fetching events:', error);
          reject(error);
        },
      );

      return unsubscribe;
    });
  },
);

export const myEvents = createAsyncThunk<Event[], string>(
  'events/myEvents',
  async (user, {rejectWithValue}) => {
    try {
      const eventsRef = firestore()
        .collection('events')
        .where('EventAdminUid', '==', user);

      const snapshot = await eventsRef.get();

      if (snapshot.empty) {
        ToastAndroid.show(
          "You haven't created any events yet. Get started by creating your first event!",
          ToastAndroid.LONG,
        );
        return [];
      }

      const eventsData: Event[] = [];
      snapshot.forEach(doc => {
        eventsData.push({id: doc.id, ...doc.data()} as Event);
      });

      return eventsData;
    } catch (error: any) {
      console.error('Error fetching events:', error);
      return rejectWithValue(error.message);
    }
  },
);

// export const updateProfile = createAsyncThunk(
//   'events/updateProfile',
//   async ({displayName, imageURI, setImageURI}: any) => {
//     try {
//       const userData: any = auth().currentUser;

//       let imageUrl = userData.photoURL; 
//       if (imageURI) {
//         // Image upload to storage
//         const imageRef = storage().ref(
//           `profile_images/${userData.uid}_${Date.now()}`,
//         );
//         await imageRef.putFile(imageURI);
//         imageUrl = await imageRef.getDownloadURL();
//       }

//       await userData.updateProfile({
//         displayName: displayName || userData.displayName,
//         photoURL: imageUrl,
//       });
//       ToastAndroid.show('start very', ToastAndroid.SHORT);

//       setImageURI(imageUrl);
//       const updatedUser = auth().currentUser;
//       if (updatedUser) {
//         await firestore()
//           .collection('user')
//           .doc(updatedUser.uid)
//           .update({
//             name: updatedUser.displayName,
//             email: updatedUser.email,
//             photoUrl: imageUrl || null,
//             uid: updatedUser.uid,
//           });
//         ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
//       } else {
//         ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
//     }
//   },
// );

export const updateProfile = createAsyncThunk(
  'events/updateProfile',
  async ({displayName, imageURI, setImageURI}: any) => {
    try {
      const userData: any = auth().currentUser;
      const currentUserData: any = {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      };

      // Check if displayName or imageURI is provided and upload the image if needed
      let imageUrl = currentUserData.photoURL; // Default to current photoURL
      if (displayName !== currentUserData.displayName || imageURI) {
        // Check if imageURI is provided and upload the image
        if (imageURI !== imageUrl) {
          const imageRef = storage().ref(
            `profile_images/${userData.uid}_${Date.now()}`,
          );
          await imageRef.putFile(imageURI);
          imageUrl = await imageRef.getDownloadURL();
        }

        // Update displayName and photoURL in userData
        const updatedUserData = {
          displayName: displayName || currentUserData.displayName,
          photoURL: imageUrl,
        };

        await userData.updateProfile(updatedUserData);
        setImageURI(imageUrl);

        // Update user document in firestore
        const updatedUser = auth().currentUser;
        if (updatedUser) {
          await firestore()
            .collection('user')
            .doc(updatedUser.uid)
            .update({
              name: updatedUser.displayName,
              email: updatedUser.email,
              photoUrl: imageUrl || null,
              uid: updatedUser.uid,
            });
        }
      }

      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error updating profile:', error);
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    }
  },
);


export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: Event, {rejectWithValue}) => {
    try {
      if (
        !eventData.eventName ||
        !eventData.price ||
        !eventData.eventDate ||
        !eventData.eventLocation ||
        !eventData.eventMapURL ||
        !eventData.eventImageURL ||
        !eventData.eventType
      ) {
        ToastAndroid.show('missing fields', ToastAndroid.SHORT);
        return;
      }
      const docRef = await firestore().collection('events').add({
        EventName: eventData.eventName,
        EventPrice: eventData.price,
        EventDate: eventData.eventDate,
        EventLocation: eventData.eventLocation,
        EventMapURL: eventData.eventMapURL,
        EventImage: eventData.eventImageURL,
        EventAdminUid: eventData.adminUid,
        EventAdminName: eventData.adminName,
        EventAdminPhoto: eventData.adminPhoto,
        EventParticipate: eventData.participate,
        EventType: eventData.eventType,
      });
      console.log('eventcreate');
      const eventId = docRef.id;
      return eventId;
    } catch (error: any) {
      console.error('Error creatings event:', error);
      return rejectWithValue(error.message);
    }
  },
);

const eventsSlice = createSlice({
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
        state.error = null;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(myEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.event = action.payload;
      })
      .addCase(myEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, actoin) => {
        state.loading = false;
        state.error = null;
        state.updateProfile = actoin.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const eventsActions = eventsSlice.actions;
export default eventsSlice.reducer;
