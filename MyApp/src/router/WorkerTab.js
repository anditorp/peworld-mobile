import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Search, WorkerProfile, Inbox} from '../screens/index';
import TabBar from '../components/module/TabBar/TabBar';

const Tab = createBottomTabNavigator();

function WorkerTab() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
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

export default WorkerTab;
