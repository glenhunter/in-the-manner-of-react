/**
 * WordDisplay component
 * Displays the current adverb word and definition with animation
 */

import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Adverb} from '../data/types';
import {Colors, Typography, Spacing} from '../constants';

interface WordDisplayProps {
  word: Adverb;
}

export function WordDisplay({word}: WordDisplayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);

    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [word.id, fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{scale: scaleAnim}],
        },
      ]}>
      <Text style={styles.word}>{word.word}</Text>
      <Text style={styles.definition}>{word.definition}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
  },
  word: {
    fontSize: Typography.fontSize.wordDisplay,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    textShadowColor: Colors.shadow,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  definition: {
    fontSize: Typography.fontSize.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
    textShadowColor: Colors.shadow,
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});
