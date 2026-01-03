/**
 * In The Manner Of - Party Game
 * Main App Component
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WordBankProvider} from './src/contexts/WordBankContext';
import {AppNavigator} from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <WordBankProvider>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </WordBankProvider>
    </SafeAreaProvider>
  );
}

export default App;
