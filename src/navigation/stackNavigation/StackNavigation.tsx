import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventDetail from '../../screens/frontend/eventDetail/EventDetail';
import TicketDetail from '../../screens/frontend/ticketDetail/TicketDetail';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from '../tabNavigation/TabNavigation';
import Home from '../../screens/frontend/home/Home';
import ResetPassword from '../../screens/frontend/resetPassword/ResetPassword';
import SignIn from '../../screens/auth/signIn/SignIn';
import SignUp from '../../screens/auth/signup/SignUp';
import auth from '@react-native-firebase/auth';
import EditEvent from '../../screens/frontend/editEvent/EditEvent';

const StackNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const Stack = createNativeStackNavigator();
  if (initializing) return null;

  if (!user) {
    return (
      <>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              options={{headerShown: false}}
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignUp"
              component={SignUp}
            />
          </Stack.Group>
        </Stack.Navigator>
      </>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="TabNavigation"
          component={TabNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EventDetail"
          component={EventDetail}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TicketDetail"
          component={TicketDetail}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditEvent"
          component={EditEvent}
        />
        
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigation;
