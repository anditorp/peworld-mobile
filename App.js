import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginWorker,
  LoginRecruiter,
  RegisterRecruiter,
  RegisterWorker,
  OptionLogin,
  WorkerEdit,
  RecruiterEdit,
  EditExperienceScreen,
  EditPortfolioScreen,
} from './MyApp/src/screens/index';
import WorkerTab from './MyApp/src/router/WorkerTab';
import RecruiterTab from './MyApp/src/router/RecruiterTab';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const Stack = createNativeStackNavigator();

function App() {
  // Add OneSignal within your App's root component

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('31bd30f6-1745-4d3c-82fc-98f9c88a58a8');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

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
            name="LoginRecruiter"
            component={LoginRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterRecruiter"
            component={RegisterRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterWorker"
            component={RegisterWorker}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WorkerTab"
            component={WorkerTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RecruiterTab"
            component={RecruiterTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WorkerEdit"
            component={WorkerEdit}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditPortfolioScreen"
            component={EditPortfolioScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditExperienceScreen"
            component={EditExperienceScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RecruiterEdit"
            component={RecruiterEdit}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
