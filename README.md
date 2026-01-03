# In The Manner Of

A charades-style party game for iOS and Android where players act out activities "in the manner of" secret adverbs, and one player tries to guess the word.

## About

**In The Manner Of** is a React Native mobile game designed for groups of 3 or more players. One player is the guesser while others see a secret adverb (like "nervously," "gracefully," or "pompously"). The guesser asks players to perform actions "in the manner of the word" and tries to guess the adverb based on their performances.

### Features

- 110 curated adverbs across three difficulty levels (Easy, Medium, Hard)
- Random mode for mixed difficulty
- Word tracking to prevent repetition
- Clean, animated gradient UI
- Offline-first (no internet required)
- Privacy-focused (no data collection, local storage only)
- Portrait-only orientation for group viewing

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [React Native development environment](https://reactnative.dev/docs/set-up-your-environment)
- For iOS: Xcode, CocoaPods, Ruby 3.0+
- For Android: Android Studio, JDK

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd in-the-manner-of-react
```

2. Install dependencies:
```bash
npm install
```

3. iOS only - Install CocoaPods dependencies:
```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running the App

Start the Metro bundler:
```bash
npm start
```

In a separate terminal, run on your platform:

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Screen components
├── navigation/       # React Navigation setup
├── contexts/         # React Context (WordBankContext)
├── data/             # Data models, WordBank class, adverbs list
├── utils/            # Storage utilities (AsyncStorage)
└── constants/        # Design tokens (colors, typography, spacing)
```

## How to Play

1. Choose one player to be the guesser
2. Pass the device to all other players (not the guesser) to see the secret adverb
3. The guesser asks players to act out activities "in the manner of the word"
   - Example: "In the manner of the word, ride a bicycle"
4. The guesser can make guesses at any time
5. If all players have acted without a correct guess, reveal the word and start a new round

No scoring—just fun!

## Architecture

The app uses a **Context-based state management** pattern:

- **WordBank class**: Manages word selection, filtering by difficulty, and persistence
- **WordBankContext**: Global state provider exposing word operations to all screens
- **AsyncStorage**: Persists used word IDs locally (key: `@used_word_ids`)
- **React Navigation**: Native stack navigator with modal presentations

Key pattern: `null` difficulty = "Random" mode (selects from all difficulty levels)

## Development

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

### Fast Refresh

React Native's Fast Refresh automatically updates the app when you save changes. For a full reload:
- **iOS**: Press `R` in the simulator
- **Android**: Press `R` twice or `Ctrl/Cmd + M` → Reload

## Documentation

Detailed design and architecture documentation is available in `~/Documents/MannerOf/`:
- Game concept and rules
- Component architecture
- Design specification
- User flows

See [CLAUDE.md](./CLAUDE.md) for development guidelines.

## Tech Stack

- React Native 0.83.1
- TypeScript
- React Navigation (native-stack)
- AsyncStorage
- react-native-linear-gradient
- react-native-vector-icons (Ionicons)

## License

See LICENSE file for details.
