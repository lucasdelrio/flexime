// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// Space Grotesk
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

// Work Sans
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
} from '@expo-google-fonts/work-sans';

const BG = '#0D0C0F';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_700Bold,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text style={{ color: 'white' }}>Loading…</Text>;
  }

  // Default font for all <Text>: Work Sans
  Text.defaultProps = Text.defaultProps || {};
  const base = Array.isArray(Text.defaultProps.style)
    ? Text.defaultProps.style
    : [Text.defaultProps.style].filter(Boolean);
  Text.defaultProps.style = [{ fontFamily: 'WorkSans_400Regular' }, ...base];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true, // ✅ enable headers globally
          headerStyle: { backgroundColor: BG },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: BG },
        }}
      >
        {/* Tabs container should NOT show a header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Any screen outside the tabs (e.g., favourites) keeps a header */}
        <Stack.Screen name="favourites" options={{ title: 'Favourites' }} />
        <Stack.Screen name="settings"  options={{ title: 'Settings' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
