// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { House, MagnifyingGlass, User } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG = '#0D0C0F';
const MUTED = '#6F6F6F';
const WHITE = '#FFFFFF';

export default function TabsLayout() {
  const insets = useSafeAreaInsets(); // 👈 this gives us safe area values (top, bottom, etc.)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: { backgroundColor: BG },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(27,27,27,0.98)', // dark translucent
          borderTopColor: 'transparent',
          height: 60 + insets.bottom, // safe area aware
          paddingBottom: insets.bottom > 0 ? insets.bottom - 2 : 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: MUTED,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => <House color={color} size={size ?? 22} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <MagnifyingGlass color={color} size={size ?? 22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Lucas',
          tabBarIcon: ({ color, size }) => <User color={color} size={size ?? 22} />,
        }}
      />
    </Tabs>
  );
}
