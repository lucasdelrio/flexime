import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const scheme = useColorScheme();
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0b0b' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: 'black' },
        }}
      />
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
