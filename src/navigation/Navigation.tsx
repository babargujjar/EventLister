import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './stackNavigation/StackNavigation';


const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default Navigation;