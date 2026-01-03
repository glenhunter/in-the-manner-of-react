/**
 * Color constants for the app
 * Based on Design Specification
 */

export const Colors = {
  // Gradient colors
  gradient: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    pink: '#EC4899',
  },

  // Difficulty colors
  difficulty: {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444',
    random: '#8B5CF6',
  },

  // Semantic colors
  success: '#10B981',
  destructive: '#EF4444',
  primaryAction: '#3B82F6',
  info: '#3B82F6',

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.9)',
    tertiary: 'rgba(255, 255, 255, 0.8)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },

  // Background overlays
  overlay: {
    light: 'rgba(255, 255, 255, 0.15)',
    medium: 'rgba(255, 255, 255, 0.25)',
    heavy: 'rgba(255, 255, 255, 0.3)',
  },

  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.2)',
} as const;

// Gradient color array for background animation
export const GRADIENT_COLORS = [
  Colors.gradient.purple,
  Colors.gradient.blue,
  Colors.gradient.pink,
] as const;
