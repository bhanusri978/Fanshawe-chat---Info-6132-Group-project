import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#C8102E' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
    >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerLeft: () => null}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;
