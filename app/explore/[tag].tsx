import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { loadAll } from '~/lib/routines';
import CoverCard from '~/components/CoverCard';
import type { Routine } from '~/types/routine';

export default function ExploreByTag() {
  const { tag } = useLocalSearchParams<{ tag: string }>();
  const [data, setData] = React.useState<Routine[]>([]);

  React.useEffect(() => {
    (async () => {
      const all = await loadAll();
      setData(all.filter(r => r.tags?.includes(String(tag))));
    })();
  }, [tag]);

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
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
          <Text style={{ color: 'white', fontSize: 20 }}>{String(tag).toUpperCase()}</Text>
        </View>
      }
    />
  );
}
