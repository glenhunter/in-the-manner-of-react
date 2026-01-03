/**
 * AppNavigator
 * Main navigation configuration for the app
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../data/types';
import {StartScreen} from '../screens/StartScreen';
import {GameScreen} from '../screens/GameScreen';
import {DifficultySelectionScreen} from '../screens/DifficultySelectionScreen';
import {RulesScreen} from '../screens/RulesScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {WordsManagementScreen} from '../screens/WordsManagementScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen
          name="DifficultySelection"
          component={DifficultySelectionScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Rules"
          component={RulesScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="WordsManagement"
          component={WordsManagementScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
