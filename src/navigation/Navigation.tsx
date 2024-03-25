import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './stackNavigation/StackNavigation';
import TabNavigation from './tabNavigation/TabNavigation';

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
      <TabNavigation />
    </NavigationContainer>
  );
}

export default Navigation;