import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { loadAll } from '~/lib/routines';
import type { Routine } from '~/types/routine';
import CoverCard from '~/components/CoverCard';

export default function Home() {
  const [all, setAll] = React.useState<Routine[]>([]);
  const [hero, setHero] = React.useState<Routine | null>(null);

  React.useEffect(() => {
    (async () => {
      const routines = await loadAll();
      setAll(routines);
      setHero(routines.find(r => r.tags?.includes('full-body')) ?? routines[0] ?? null);
    })();
  }, []);

  if (!hero) return null;
  const others = all.filter(r => r.id !== hero.id);

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 22 }}>Listo para moverte</Text>
            <Link href="/settings" asChild>
              <TouchableOpacity><Text style={{ color: '#6cf' }}>Ajustes</Text></TouchableOpacity>
            </Link>
          </View>

          <View style={{ marginBottom: 12, marginTop: 8 }}>
            <CoverCard
              title={hero.title}
              subtitle={`${Math.round(hero.totalTimeSec / 60)} min • Full‑body`}
              variant={hero.coverVariant ?? 'fullBody'}
              height={190}
            />
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
              <Link href={`/routine/${hero.id}/play`} asChild>
                <TouchableOpacity style={{ backgroundColor: '#2ee58a', padding: 14, borderRadius: 12 }}>
                  <Text style={{ color: 'black', fontWeight: '700' }}>Start Training</Text>
                </TouchableOpacity>
              </Link>
              <Link href={`/routine/${hero.id}`} asChild>
                <TouchableOpacity style={{ backgroundColor: '#1f1f1f', padding: 14, borderRadius: 12 }}>
                  <Text style={{ color: 'white' }}>Ver pasos</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <Link href="/explore" asChild>
            <TouchableOpacity><Text style={{ color: '#6cf' }}>Explorar por zonas del cuerpo →</Text></TouchableOpacity>
          </Link>

          <Text style={{ color: 'white', fontSize: 18, marginTop: 16, marginBottom: 6 }}>Ejemplos</Text>
        </View>
      }
      data={others}
      keyExtractor={(r) => r.id}
      renderItem={({ item }) => (
        <Link href={`/routine/${item.id}`} asChild>
          <TouchableOpacity style={{ marginHorizontal: 16, marginBottom: 10 }}>
            <CoverCard
              title={item.title}
              subtitle={`${Math.round(item.totalTimeSec/60)} min • ${item.tags?.slice(0,2).join(' • ')}`}
              variant={item.coverVariant}
              height={140}
            />
          </TouchableOpacity>
        </Link>
      )}
      ListFooterComponent={
        <View style={{ padding: 16 }}>
          <Link href="/create" asChild>
            <TouchableOpacity style={{ backgroundColor: '#1f1f1f', padding: 14, borderRadius: 12 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>+ Crear rutina</Text>
            </TouchableOpacity>
          </Link>
        </View>
      }
    />
  );
}
