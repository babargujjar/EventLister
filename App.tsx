import React,{useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
// import SignUp from './src/screens/signup/SignUp'
// import Signin from './src/screens/signIn/SignIn'
// import Home from './src/screens/home/Home';
// import SortedEvents from './src/screens/sortedEvents/SortedEvents';
// import EventDetail from './src/screens/eventDetail/EventDetail';
// import TicketDetail from './src/screens/ticketDetail/TicketDetail';
// import MyPosting from './src/screens/myPosting/MyPosting';
// import CreateEvent from './src/screens/createEvent/CreateEvent';
import {NavigationContainer} from "@react-navigation/native"
import Tabs from './src/navigation/tabNavigation/TabNavigation';


const App = () => {
    useEffect(() => {
      SplashScreen.hide();
    }, []);

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
