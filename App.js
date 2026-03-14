import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {currentScreen === 'login' ? (
          <LoginScreen onNavigateSignup={() => setCurrentScreen('signup')} />
        ) : (
          <SignupScreen onNavigateLogin={() => setCurrentScreen('login')} />
        )}
        <ExpoStatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // We can remove paddingTop since SafeAreaView handles the top inset now
  },
});
