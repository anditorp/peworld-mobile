import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginWorker,
  RegisterWorker,
  OptionLogin,
  WorkerEdit,
} from './MyApp/src/screens/index';
import MainTab from './MyApp/src/router/MainTab';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView>
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
          <Stack.Screen
            name="WorkerEdit"
            component={WorkerEdit}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
