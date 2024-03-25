import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
// import SignUp from './src/screens/signup/SignUp'
// import Signin from './src/screens/signIn/SignIn'
// import Home from './src/screens/home/Home';
// import SortedEvents from './src/screens/sortedEvents/SortedEvents';
// import EventDetail from './src/screens/eventDetail/EventDetail';
// import TicketDetail from './src/screens/ticketDetail/TicketDetail';
// import MyPosting from './src/screens/myPosting/MyPosting';
// import CreateEvent from './src/screens/createEvent/CreateEvent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/stackNavigation/StackNavigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    
      <GestureHandlerRootView style={{flex: 1}}>
        <StackNavigation />
      </GestureHandlerRootView>
    
  );
};

export default App;
