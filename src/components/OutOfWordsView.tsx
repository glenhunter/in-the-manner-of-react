/**
 * OutOfWordsView component
 * Displayed when all words in the current difficulty have been used
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from './Button';
import {Difficulty, DifficultyOption} from '../data/types';
import {Colors, Typography, Spacing} from '../constants';

interface OutOfWordsViewProps {
  difficulty: DifficultyOption;
  onResetCurrent: () => void;
  onResetAll: () => void;
}

export function OutOfWordsView({
  difficulty,
  onResetCurrent,
  onResetAll,
}: OutOfWordsViewProps) {
  const difficultyName =
    difficulty === null ? 'Random' : difficulty.toLowerCase();
  const message = difficulty
    ? `You've used all the ${difficultyName} words! Reset to play again.`
    : `You've used all available words! Reset to play again.`;

  const currentButtonLabel = difficulty
    ? `Reset ${difficulty} Words`
    : `Reset Random Words`;

  return (
    <View style={styles.container}>
      <Icon
        name="checkmark-circle"
        size={80}
        color={Colors.success}
        style={styles.icon}
      />
      <Text style={styles.title}>All Words Used!</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttons}>
        <Button
          title={currentButtonLabel}
          onPress={onResetCurrent}
          color={Colors.primaryAction}
          variant="primary"
        />
        <Button
          title="Reset All Words"
          onPress={onResetAll}
          color={Colors.difficulty.medium}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
  },
  icon: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.title,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textShadowColor: Colors.shadow,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  message: {
    fontSize: Typography.fontSize.small,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    textShadowColor: Colors.shadow,
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  buttons: {
    width: '100%',
    gap: Spacing.md,
  },
});
