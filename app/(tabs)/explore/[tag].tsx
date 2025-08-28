// app/(tabs)/explore/[tag].tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { loadAll } from '~/lib/routines';
import type { Routine } from '~/types/routine';
import CoverCard from '~/components/CoverCard';
import { Platform } from 'react-native';

const BG = '#0D0C0F';

export default function ExploreByTag() {
  const { tag } = useLocalSearchParams<{ tag: string }>();
  const nav = useNavigation();
  const [data, setData] = React.useState<Routine[]>([]);

  // 👇 Hide tab bar while this screen is focused
  React.useEffect(() => {
    const parent = nav.getParent?.(); // Tabs navigator
    parent?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent?.setOptions({
        tabBarStyle: {
          backgroundColor: BG,
          borderTopColor: BG,
          height: Platform.select({ ios: 72, default: 64 }),
          paddingTop: 6,
        },
      });
    };
  }, [nav]);

  React.useEffect(() => {
    (async () => {
      const all = await loadAll();
      setData(all.filter((r) => r.tags?.includes(String(tag))));
    })();
  }, [tag]);

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12, backgroundColor: BG }}
      data={data}
      keyExtractor={(r) => r.id}
      renderItem={({ item }) => (
        <Link href={`/routine/${item.id}`} asChild>
          <TouchableOpacity>
            <CoverCard
              title={item.title}
              subtitle={`${Math.round(item.totalTimeSec / 60)} min • ${String(tag)}`}
              variant={item.coverVariant}
              height={140}
            />
          </TouchableOpacity>
        </Link>
      )}
      ListHeaderComponent={
        <View style={{ marginBottom: 8 }}>
          <Text style={{ color: 'white', fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold' }}>
            {String(tag).toUpperCase()}
          </Text>
        </View>
      }
    />
  );
}
