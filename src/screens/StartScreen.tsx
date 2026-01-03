/**
 * StartScreen
 * Initial welcome screen
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../data/types';
import {AnimatedBackground} from '../components/AnimatedBackground';
import {StartView} from '../components/StartView';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

export function StartScreen({navigation}: Props) {
  const handleNewGame = () => {
    navigation.navigate('DifficultySelection', {});
  };

  const handleHowToPlay = () => {
    navigation.navigate('Rules');
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={styles.content}>
        <StartView onNewGame={handleNewGame} onHowToPlay={handleHowToPlay} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
