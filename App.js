import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginWorker,
  RegisterWorker,
  OptionLogin,
} from './MyApp/src/screens/index';
import MainTab from './MyApp/src/router/MainTab';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OptionLogin">
        <Stack.Screen
          name="OptionLogin"
          component={OptionLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginWorker"
          component={LoginWorker}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterWorker"
          component={RegisterWorker}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
