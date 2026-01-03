/**
 * Core type definitions for the app
 */

/**
 * Difficulty levels for adverbs
 */
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

/**
 * Represents a single adverb with its definition and difficulty
 */
export interface Adverb {
  /** Unique identifier (UUID format) */
  id: string;

  /** The adverb word (e.g., "Quickly", "Mysteriously") */
  word: string;

  /** Short definition explaining the adverb */
  definition: string;

  /** Difficulty classification */
  difficulty: Difficulty;
}

/**
 * Difficulty option for game mode
 * null represents "Random" mode (any difficulty)
 */
export type DifficultyOption = Difficulty | null;

/**
 * Statistics for a specific difficulty level
 */
export interface DifficultyStats {
  total: number;
  used: number;
  available: number;
}

/**
 * Navigation parameter types for React Navigation
 */
export type RootStackParamList = {
  Start: undefined;
  Game: undefined;
  DifficultySelection: {
    onSelect?: (difficulty: DifficultyOption) => void;
  };
  Rules: undefined;
  Settings: undefined;
  WordsManagement: undefined;
};
