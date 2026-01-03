/**
 * RulesScreen
 * Display game rules and instructions
 */

import React from 'react';
import {View, ScrollView, Text, StyleSheet, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../data/types';
import {NavigationHeader} from '../components/NavigationHeader';
import {Typography, Spacing} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Rules'>;

export function RulesScreen({navigation}: Props) {
  const steps = [
    'Choose one player to be the guesser',
    'Pass the device to all other players (not the guesser) so they can see the secret adverb',
    'The guesser asks players to act out activities "in the manner of the word"',
    'Examples: "In the manner of the word, ride a bicycle" or "In the manner of the word, brush your teeth"',
    'The guesser can make guesses at any time',
    "If all players have acted and the guesser hasn't guessed correctly, reveal the word and move to the next round",
  ];

  const optionalRules = [
    'Can actors speak while acting?',
    'Are charades-style clues allowed?',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="Rules" onClose={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>How to Play</Text>
        <Text style={styles.intro}>
          This is a party game for 3 or more players.
        </Text>

        {steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <Text style={[styles.sectionTitle, styles.sectionMarginTop]}>
          Optional Rules
        </Text>
        <Text style={styles.body}>
          Before starting, all players should agree on:
        </Text>

        {optionalRules.map((rule, index) => (
          <View key={index} style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{rule}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Remember: This game has no score - it's all about fun and
          entertainment!
        </Text>
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
  sectionTitle: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: '#333',
    marginBottom: Spacing.md,
  },
  sectionMarginTop: {
    marginTop: Spacing.xl,
  },
  intro: {
    fontSize: Typography.fontSize.tiny,
    color: '#666',
    marginBottom: Spacing.lg,
  },
  step: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryAction,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  stepNumberText: {
    fontSize: Typography.fontSize.tiny,
    fontWeight: Typography.fontWeight.semibold,
    color: '#fff',
  },
  stepText: {
    flex: 1,
    fontSize: Typography.fontSize.tiny,
    color: '#333',
    lineHeight: 22,
  },
  body: {
    fontSize: Typography.fontSize.tiny,
    color: '#666',
    marginBottom: Spacing.md,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.sm,
  },
  bullet: {
    fontSize: Typography.fontSize.tiny,
    color: '#333',
    marginRight: Spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: Typography.fontSize.tiny,
    color: '#333',
  },
  footer: {
    fontSize: Typography.fontSize.tiny,
    fontStyle: 'italic',
    color: '#999',
    marginTop: Spacing.lg,
  },
});
