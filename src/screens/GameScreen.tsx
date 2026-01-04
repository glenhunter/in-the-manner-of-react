/**
 * GameScreen
 * Main gameplay screen with word display
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../data/types';
import {useWordBankContext} from '../contexts/WordBankContext';
import {AnimatedBackground} from '../components/AnimatedBackground';
import {WordDisplay} from '../components/WordDisplay';
import {StartView} from '../components/StartView';
import {OutOfWordsView} from '../components/OutOfWordsView';
import {Colors, Typography, Spacing} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export function GameScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {
    currentWord,
    currentDifficulty,
    refreshWord,
    resetCurrentLevel,
    resetAllWords,
  } = useWordBankContext();

  const [outOfWords, setOutOfWords] = useState(false);

  const handleRefresh = async () => {
    const success = await refreshWord();
    if (!success) {
      setOutOfWords(true);
    }
  };

  const handleNewGame = () => {
    navigation.navigate('DifficultySelection', {});
  };

  const handleHowToPlay = () => {
    navigation.navigate('Rules');
  };

  const handleResetCurrent = async () => {
    setOutOfWords(false);
    await resetCurrentLevel();
  };

  const handleResetAll = async () => {
    setOutOfWords(false);
    await resetAllWords();
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + Spacing.sm}]}>
        <Text style={styles.headerTitle}>In the Manner Of</Text>
        <View style={styles.headerButtons}>
          {currentWord && !outOfWords && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleRefresh}>
              <Icon name="refresh" size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleSettings}>
            <Icon
              name="settings-outline"
              size={24}
              color={Colors.text.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {outOfWords ? (
          <OutOfWordsView
            difficulty={currentDifficulty}
            onResetCurrent={handleResetCurrent}
            onResetAll={handleResetAll}
          />
        ) : currentWord ? (
          <WordDisplay word={currentWord} />
        ) : (
          <StartView onNewGame={handleNewGame} onHowToPlay={handleHowToPlay} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
