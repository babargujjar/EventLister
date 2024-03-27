import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventDetail from '../../screens/frontend/eventDetail/EventDetail';
import TicketDetail from '../../screens/frontend/ticketDetail/TicketDetail';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from '../tabNavigation/TabNavigation';
import Home from '../../screens/frontend/home/Home';
import ResetPassword from '../../screens/frontend/resetPassword/ResetPassword';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
