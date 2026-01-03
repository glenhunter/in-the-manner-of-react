# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **React Native 0.83.1** with TypeScript
- **React Navigation** (native-stack) for navigation
- **AsyncStorage** for local persistence
- **react-native-linear-gradient** for animated backgrounds
- **react-native-vector-icons** (Ionicons) for icons

## Development Commands

### Initial Setup

```bash
# Install dependencies
npm install

# iOS: Install CocoaPods dependencies (requires Ruby 3.0+)
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS (opens simulator)
npm run ios

# Run on Android (requires emulator or device)
npm run android

# Lint code
npm run lint

# Run tests
npm test
```

### Platform-Specific Notes

- **iOS**: Must run `pod install` after any native dependency changes
- **Android**: Portrait orientation locked via `android:screenOrientation="portrait"` in AndroidManifest.xml
- **iOS**: Portrait orientation locked via `UISupportedInterfaceOrientations` in Info.plist

## Architecture Overview

### Core Concept

Party game where players act out adverbs (charades-style). One player guesses while others know the secret word. No scoring, just entertainment.

### Data Flow Architecture

The app uses a **single source of truth** pattern with React Context:

```
WordBank (class) → WordBankContext (provider) → Screen Components
     ↓
AsyncStorage (persistence)
```

**WordBank class** (`src/data/WordBank.ts`):
- Manages 110 adverbs (30 Easy, 40 Medium, 40 Hard)
- Tracks used word IDs in a Set
- Filters available words by difficulty (`DifficultyOption` = Easy | Medium | Hard | null)
- `null` difficulty = "Random" mode (selects from all difficulties)
- Persists used word IDs to AsyncStorage

**WordBankContext** (`src/contexts/WordBankContext.tsx`):
- Global state provider wrapping the entire app
- Exposes methods: `startNewGame()`, `refreshWord()`, `resetCurrentLevel()`, `resetAllWords()`
- Maintains `currentWord` and `currentDifficulty` in React state
- Must be initialized on app launch (calls `WordBank.initialize()`)

**Key Pattern**: All word operations are async because they persist to AsyncStorage. Screens must `await` operations and handle the boolean return value (false = no words available).

### Screen Flow

```
StartScreen
    ↓ (New Game)
DifficultySelectionScreen (modal)
    ↓ (Select difficulty)
GameScreen
    ├─ WordDisplay (if word exists)
    ├─ OutOfWordsView (if pool exhausted)
    └─ Settings gear → SettingsScreen (modal)
        ├─ New Game → DifficultySelectionScreen
        ├─ Rules → RulesScreen
        └─ Words → WordsManagementScreen
```

### Design System

All visual constants in `src/constants/`:
- **colors.ts**: Gradient colors (purple/blue/pink cycle), difficulty colors, text opacity variants
- **typography.ts**: Font sizes (largeTitle: 48, wordDisplay: 60, etc.)
- **spacing.ts**: 8px scale (xs: 8, sm: 12, md: 16, lg: 20, xl: 30, xxl: 40)

**AnimatedBackground component**: Uses Animated API to cycle through gradient colors over 10-second loops.

### Storage Layer

**AsyncStorage key**: `@used_word_ids`
- Stores array of UUID strings (used word IDs)
- No cloud sync, local-only persistence
- Privacy-focused: no user data, no analytics

## Git Workflow

- Feature branches for new work
- Branch naming: descriptive (e.g., `subjectively-better-or-worse`, `rule-of-thirds`)

## Documentation

- **Plans and documentation**: Save to `~/Documents/MannerOf/` (Obsidian vault)
- **Game concept**: `~/Documents/MannerOf/0. Game Concept & Basic Rules.md`
- **Project Overview**: `~/Documents/MannerOf/1. React Native Project Overview.md`
- **Implementation Guide**: `~/Documents/MannerOf/2. Implementation Guide.md`
- **Design Specification**: `~/Documents/MannerOf/3. Design Specification.md`
- **Component Architecture & Data Model**: `~/Documents/MannerOf/4. Component Architecture & Data Models.md`
- **User Flows and Interactions**: `~/Documents/MannerOf/User Flows & Interactions.md`
- **Word List**: `~/Documents/MannerOf/6. Adverb Word List.md`

## Development Preferences

- Keep solutions simple and focused
- Avoid over-engineering or premature abstraction
- Only add features explicitly requested
- Use existing components and patterns
