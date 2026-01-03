/**
 * WordBank class manages word selection and tracking
 */

import {Adverb, Difficulty, DifficultyOption, DifficultyStats} from './types';
import {adverbs} from './adverbs';
import {loadUsedWords, saveUsedWords} from '../utils/storage';

export class WordBank {
  private allWords: Adverb[];
  private usedWordIds: Set<string>;

  constructor() {
    this.allWords = adverbs;
    this.usedWordIds = new Set();
  }

  /**
   * Initialize the word bank by loading used word IDs from storage
   */
  async initialize(): Promise<void> {
    const ids = await loadUsedWords();
    this.usedWordIds = new Set(ids);
  }

  /**
   * Get a random word from the available pool based on difficulty
   * @param difficulty - Difficulty level or null for random
   * @returns Random adverb or null if no words available
   */
  getRandomWord(difficulty: DifficultyOption): Adverb | null {
    const available = this.getAvailableWords(difficulty);
    if (available.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  /**
   * Mark a word as used and persist to storage
   */
  async markAsUsed(adverb: Adverb): Promise<void> {
    this.usedWordIds.add(adverb.id);
    await saveUsedWords(Array.from(this.usedWordIds));
  }

  /**
   * Reset used words for a specific difficulty level
   */
  async resetUsedWords(difficulty: Difficulty): Promise<void> {
    const wordsToReset = this.allWords
      .filter(w => w.difficulty === difficulty)
      .map(w => w.id);

    wordsToReset.forEach(id => this.usedWordIds.delete(id));
    await saveUsedWords(Array.from(this.usedWordIds));
  }

  /**
   * Reset all used words
   */
  async resetAllUsedWords(): Promise<void> {
    this.usedWordIds.clear();
    await saveUsedWords([]);
  }

  /**
   * Get available (unused) words for a specific difficulty or all difficulties
   */
  getAvailableWords(difficulty: DifficultyOption): Adverb[] {
    let words = this.allWords;

    // Filter by difficulty if specified (null means random - use all difficulties)
    if (difficulty !== null) {
      words = words.filter(w => w.difficulty === difficulty);
    }

    // Filter out used words
    return words.filter(w => !this.usedWordIds.has(w.id));
  }

  /**
   * Get statistics for a specific difficulty level
   */
  getStats(difficulty: Difficulty): DifficultyStats {
    const total = this.allWords.filter(w => w.difficulty === difficulty);
    const used = total.filter(w => this.usedWordIds.has(w.id));

    return {
      total: total.length,
      used: used.length,
      available: total.length - used.length,
    };
  }

  /**
   * Get statistics for all difficulty levels
   */
  getAllStats(): Record<Difficulty, DifficultyStats> {
    return {
      [Difficulty.Easy]: this.getStats(Difficulty.Easy),
      [Difficulty.Medium]: this.getStats(Difficulty.Medium),
      [Difficulty.Hard]: this.getStats(Difficulty.Hard),
    };
  }
}
