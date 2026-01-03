/**
 * Typography constants for the app
 * Based on Design Specification
 */

export const Typography = {
  // Font sizes
  fontSize: {
    // Display
    largeTitle: 48,
    title: 36,
    wordDisplay: 60,

    // Body
    largeBody: 28,
    regular: 24,
    medium: 20,

    // Caption
    small: 18,
    tiny: 16,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line height multipliers
  lineHeight: {
    display: 1.2,
    body: 1.5,
    compact: 1.3,
  },
} as const;

// Helper to calculate line height
export const getLineHeight = (
  fontSize: number,
  multiplier: number = Typography.lineHeight.body
): number => {
  return fontSize * multiplier;
};
