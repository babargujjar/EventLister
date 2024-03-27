import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screens/frontend/home/Home';
import MyPosting from '../../screens/frontend/myPosting/MyPosting';
import CreateEvent from '../../screens/frontend/createEvent/CreateEvent';
import SignIn from '../../screens/auth/signIn/SignIn';
import {Image, Text, View} from 'react-native';
import SignUp from '../../screens/auth/signup/SignUp';
import EventDetail from '../../screens/frontend/eventDetail/EventDetail';
import SortedEvents from '../../screens/frontend/sortedEvents/SortedEvents';
import Profile from '../../screens/frontend/profile/Profile';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 64,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <>
                <Image
                  style={{
                    borderColor: '#B6C5CD',
                    height: 24,
                    width: 28,
                  }}
                  source={
                    focused
                      ? require('../../assets/images/Homefocused.png')
                      : require('../../assets/images/Home.png')
                  }
                />
              </>
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 64,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <>
                <Image
                  style={{
                    borderColor: '#B6C5CD',
                    height: 28,
                    width: 28,
                  }}
                  source={
                    focused
                      ? require('../../assets/images/Discoveryfocused.png')
                      : require('../../assets/images/Discovery.png')
                  }
                />
              </>
            ),
          }}
          name="MyEvent"
          component={MyPosting}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 64,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: '#6F3DE9',
                  height: 52,
                  width: 52,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Image
                  style={{
                    borderColor: '#B6C5CD',
                    height: 24,
                    width: 24,
                  }}
                  source={require('../../assets/images/Add.png')}
                />
              </View>
            ),
          }}
          name="CreateEvent"
          component={CreateEvent}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 64,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <>
                <Image
                  style={{
                    borderColor: '#B6C5CD',
                    height: 22,
                    width: 26,
                  }}
                  source={
                    focused
                      ? require('../../assets/images/Ticketfocused.png')
                      : require('../../assets/images/Ticket.png')
                  }
                />
              </>
            ),
          }}
          name="SortedEvents"
          component={SortedEvents}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 64,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => (
              <>
                <Image
                  style={{
                    borderColor: '#B6C5CD',
                    height: 26,
                    width: 22,
                  }}
                  source={
                    focused
                      ? require('../../assets/images/Profilefocused.png')
                      : require('../../assets/images/Profile.png')
                  }
                />
              </>
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigation;
