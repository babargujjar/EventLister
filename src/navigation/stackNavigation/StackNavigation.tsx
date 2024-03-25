import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventDetail from '../../screens/eventDetail/EventDetail';
import TicketDetail from '../../screens/ticketDetail/TicketDetail';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '../tabNavigation/TabNavigation';
import Home from '../../screens/home/Home';

const StackNavigation = ()=>{

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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
