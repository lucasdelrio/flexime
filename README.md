# Flexime — Expo Starter

Unified mobility app with:
- **Home** (Train Now hero), **Explore** (by body part), **Create/Build/Run**
- **Preloaded routines** (6 categories)
- Code-driven covers (no PNGs), haptics, speech, keep-awake
- **Settings**: voice, haptics, 3-2-1 countdown (persisted)
- **FileSystem persistence** for user-made routines
- TypeScript, Expo Router, ESLint/Prettier

## 1) Prereqs
- Node 18+
- iOS Simulator (optional) or Expo Go app

## 2) Install
```bash
npm i
# or: pnpm i / yarn
```

## 3) Run on Expo Go
```bash
npm run start
# press i for iOS Simulator OR scan QR with Expo Go
```

If you see warnings:
```bash
npx expo install expo-linear-gradient expo-speech expo-haptics expo-keep-awake expo-router expo-file-system @expo/vector-icons @react-native-async-storage/async-storage
```

## 4) Project structure
- `app/` — screens (Expo Router)
- `src/` — components, libs, store, types
- `assets/routines/` — preloaded examples

## 5) Where to start
- `app/index.tsx` — Home hero and quick start
- `app/explore/` — Categories
- `app/create/` — Create flow
- `app/routine/[id]/play.tsx` — Player (respects Settings)
- `app/settings.tsx` — Settings toggles

## 6) Persisted routines
User-created routines are saved under `FileSystem.documentDirectory + 'routines/'`.
