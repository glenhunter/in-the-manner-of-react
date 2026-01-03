/**
 * WordBankContext provides global access to word management
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {WordBank} from '../data/WordBank';
import {Adverb, DifficultyOption, Difficulty, DifficultyStats} from '../data/types';

interface WordBankContextValue {
  initialized: boolean;
  currentWord: Adverb | null;
  currentDifficulty: DifficultyOption;
  startNewGame: (difficulty: DifficultyOption) => Promise<boolean>;
  refreshWord: () => Promise<boolean>;
  resetCurrentLevel: () => Promise<void>;
  resetAllWords: () => Promise<void>;
  getStats: (difficulty: Difficulty) => DifficultyStats;
  getAllStats: () => Record<Difficulty, DifficultyStats>;
}

const WordBankContext = createContext<WordBankContextValue | undefined>(
  undefined,
);

export function WordBankProvider({children}: {children: ReactNode}) {
  const [wordBank] = useState(() => new WordBank());
  const [initialized, setInitialized] = useState(false);
  const [currentWord, setCurrentWord] = useState<Adverb | null>(null);
  const [currentDifficulty, setCurrentDifficulty] =
    useState<DifficultyOption>(null);

  useEffect(() => {
    wordBank.initialize().then(() => setInitialized(true));
  }, [wordBank]);

  const startNewGame = useCallback(
    async (difficulty: DifficultyOption): Promise<boolean> => {
      setCurrentDifficulty(difficulty);
      const word = wordBank.getRandomWord(difficulty);

      if (word) {
        await wordBank.markAsUsed(word);
        setCurrentWord(word);
        return true;
      }

      return false; // No words available
    },
    [wordBank],
  );

  const refreshWord = useCallback(async (): Promise<boolean> => {
    const word = wordBank.getRandomWord(currentDifficulty);

    if (word) {
      await wordBank.markAsUsed(word);
      setCurrentWord(word);
      return true;
    }

    return false; // No words available
  }, [wordBank, currentDifficulty]);

  const resetCurrentLevel = useCallback(async () => {
    if (currentDifficulty === null) {
      await wordBank.resetAllUsedWords();
    } else {
      await wordBank.resetUsedWords(currentDifficulty);
    }
    await startNewGame(currentDifficulty);
  }, [wordBank, currentDifficulty, startNewGame]);

  const resetAllWords = useCallback(async () => {
    await wordBank.resetAllUsedWords();
    await startNewGame(currentDifficulty);
  }, [wordBank, currentDifficulty, startNewGame]);

  const getStats = useCallback(
    (difficulty: Difficulty) => {
      return wordBank.getStats(difficulty);
    },
    [wordBank],
  );

  const getAllStats = useCallback(() => {
    return wordBank.getAllStats();
  }, [wordBank]);

  const value: WordBankContextValue = {
    initialized,
    currentWord,
    currentDifficulty,
    startNewGame,
    refreshWord,
    resetCurrentLevel,
    resetAllWords,
    getStats,
    getAllStats,
  };

  return (
    <WordBankContext.Provider value={value}>
      {children}
    </WordBankContext.Provider>
  );
}

export function useWordBankContext() {
  const context = useContext(WordBankContext);
  if (!context) {
    throw new Error(
      'useWordBankContext must be used within WordBankProvider',
    );
  }
  return context;
}
