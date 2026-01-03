/**
 * AsyncStorage utilities for persisting game data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const USED_WORDS_KEY = '@used_word_ids';

/**
 * Load the list of used word IDs from persistent storage
 */
export async function loadUsedWords(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(USED_WORDS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Failed to load used words:', error);
    return [];
  }
}

/**
 * Save the list of used word IDs to persistent storage
 */
export async function saveUsedWords(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(USED_WORDS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Failed to save used words:', error);
  }
}

/**
 * Clear all used words from storage (reset)
 */
export async function clearUsedWords(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USED_WORDS_KEY);
  } catch (error) {
    console.error('Failed to clear used words:', error);
  }
}
