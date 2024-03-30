import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/stackNavigation/StackNavigation';
import {store} from './src/store/store';
import {Provider} from 'react-redux';


const App = () => {
 
  useEffect(() => {
    SplashScreen.hide();
  }, []);
 


  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <StackNavigation />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;


