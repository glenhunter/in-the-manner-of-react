/**
 * WordsManagementScreen
 * View statistics and reset word pools
 */

import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Difficulty} from '../data/types';
import {useWordBankContext} from '../contexts/WordBankContext';
import {NavigationHeader} from '../components/NavigationHeader';
import {Button} from '../components/Button';
import {Typography, Spacing, Colors} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'WordsManagement'>;

export function WordsManagementScreen({navigation}: Props) {
  const {getAllStats, resetCurrentLevel, resetAllWords} =
    useWordBankContext();

  const stats = getAllStats();

  const handleResetDifficulty = async (difficulty: Difficulty) => {
    Alert.alert(
      `Reset ${difficulty} Words?`,
      `This will clear all used ${difficulty.toLowerCase()} words and allow them to be shown again.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetCurrentLevel();
          },
        },
      ],
    );
  };

  const handleResetAll = () => {
    Alert.alert(
      'Reset All Words?',
      'This will clear all used words from all difficulty levels.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset All',
          style: 'destructive',
          onPress: async () => {
            await resetAllWords();
          },
        },
      ],
    );
  };

  const difficulties = [
    {level: Difficulty.Easy, color: Colors.difficulty.easy},
    {level: Difficulty.Medium, color: Colors.difficulty.medium},
    {level: Difficulty.Hard, color: Colors.difficulty.hard},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="Words" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        {difficulties.map(({level, color}) => {
          const diffStats = stats[level];
          return (
            <View key={level} style={styles.section}>
              <Text style={[styles.sectionTitle, {color}]}>
                {level} Words
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Available:</Text>
                  <Text style={styles.statValue}>{diffStats.available}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Used:</Text>
                  <Text style={styles.statValue}>{diffStats.used}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total:</Text>
                  <Text style={styles.statValue}>{diffStats.total}</Text>
                </View>
              </View>
              <Button
                title={`Reset ${level}`}
                onPress={() => handleResetDifficulty(level)}
                color={color}
                variant="secondary"
              />
            </View>
          );
        })}

        <View style={styles.resetAllSection}>
          <Button
            title="Reset All Words"
            onPress={handleResetAll}
            color={Colors.destructive}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.md,
  },
  statsContainer: {
    marginBottom: Spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.tiny,
    color: '#666',
  },
  statValue: {
    fontSize: Typography.fontSize.tiny,
    fontWeight: Typography.fontWeight.semibold,
    color: '#333',
  },
  resetAllSection: {
    marginTop: Spacing.lg,
  },
});
