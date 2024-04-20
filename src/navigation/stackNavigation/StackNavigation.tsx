import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventDetail from '../../screens/eventDetail/EventDetail';
import TicketDetail from '../../screens/ticketDetail/TicketDetail';
import TabNavigation from '../tabNavigation/TabNavigation';
import ResetPassword from '../../screens/resetPassword/ResetPassword';
import SignIn from '../../screens/signIn/SignIn';
import SignUp from '../../screens/signup/SignUp';
import auth from '@react-native-firebase/auth';
import EditEvent from '../../screens/editEvent/EditEvent';

const StackNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
