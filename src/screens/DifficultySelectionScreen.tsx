/**
 * DifficultySelectionScreen
 * Modal for choosing difficulty level
 */

import React from 'react';
import {View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Difficulty} from '../data/types';
import {useWordBankContext} from '../contexts/WordBankContext';
import {DifficultyCard} from '../components/DifficultyCard';
import {ModalHeader} from '../components/ModalHeader';
import {Colors, Spacing} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'DifficultySelection'>;

export function DifficultySelectionScreen({navigation, route}: Props) {
  const {startNewGame} = useWordBankContext();

  const handleSelect = async (difficulty: Difficulty | null) => {
    await startNewGame(difficulty);
    navigation.navigate('Game');

    if (route.params?.onSelect) {
      route.params.onSelect(difficulty);
    }
  };

  const difficulties = [
    {
      level: Difficulty.Easy,
      color: Colors.difficulty.easy,
      description: 'Simple, common adverbs',
    },
    {
      level: Difficulty.Medium,
      color: Colors.difficulty.medium,
      description: 'Moderate challenge',
    },
    {
      level: Difficulty.Hard,
      color: Colors.difficulty.hard,
      description: 'Tricky words to act out',
    },
    {
      level: null,
      color: Colors.difficulty.random,
      description: 'Any difficulty level',
      title: 'Random',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ModalHeader
        title="Choose Difficulty"
        onClose={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {difficulties.map((diff, index) => (
          <DifficultyCard
            key={index}
            difficulty={diff.level}
            title={diff.title || diff.level || 'Random'}
            description={diff.description}
            color={diff.color}
            onPress={() => handleSelect(diff.level)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: Spacing.lg,
  },
});
