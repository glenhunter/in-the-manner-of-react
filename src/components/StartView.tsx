/**
 * StartView component
 * Initial welcome view with game title and action buttons
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from './Button';
import {Colors, Typography, Spacing} from '../constants';

interface StartViewProps {
  onNewGame: () => void;
  onHowToPlay: () => void;
}

export function StartView({onNewGame, onHowToPlay}: StartViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>In the Manner of...</Text>
      <Text style={styles.subtitle}>The charades party game</Text>

      <View style={styles.buttonsContainer}>
        <Button
          title="New Game"
          icon="play"
          onPress={onNewGame}
          variant="primary"
        />
        <Button
          title="How To Play"
          icon="book-outline"
          onPress={onHowToPlay}
          variant="secondary"
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
  title: {
    fontSize: Typography.fontSize.largeTitle,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    textShadowColor: Colors.shadow,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: Typography.fontSize.medium,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    textShadowColor: Colors.shadow,
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  buttonsContainer: {
    width: '100%',
    gap: Spacing.md,
  },
});
