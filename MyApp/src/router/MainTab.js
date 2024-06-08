// MainTab.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Search, WorkerProfile} from '../screens/index';
import TabBar from '../components/module/TabBar/TabBar'; // Import TabBar component

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="WorkerProfile"
        component={WorkerProfile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
