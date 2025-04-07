import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './components/AuthContext'; 



export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider> 
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
