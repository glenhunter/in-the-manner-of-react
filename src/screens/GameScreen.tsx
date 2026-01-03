/**
 * GameScreen
 * Main gameplay screen with word display
 */

import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../data/types';
import {useWordBankContext} from '../contexts/WordBankContext';
import {AnimatedBackground} from '../components/AnimatedBackground';
import {WordDisplay} from '../components/WordDisplay';
import {StartView} from '../components/StartView';
import {OutOfWordsView} from '../components/OutOfWordsView';
import {CircularButton} from '../components/CircularButton';
import {Colors} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export function GameScreen({navigation}: Props) {
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

      {/* Settings Button (top-right) */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
        <Icon
          name="settings-outline"
          size={28}
          color={Colors.text.tertiary}
        />
      </TouchableOpacity>

      {/* Refresh Button (bottom-right, conditional) */}
      {currentWord && !outOfWords && (
        <CircularButton
          icon="refresh"
          onPress={handleRefresh}
          style={styles.refreshButton}
        />
      )}
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
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 20,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
