import { Stack } from 'expo-router';

const BG = '#0D0C0F';

export default function ExploreTabStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: BG },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: BG },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Explore' }} />
      <Stack.Screen name="[tag]" options={{ title: 'Category' }} />
    </Stack>
  );
}