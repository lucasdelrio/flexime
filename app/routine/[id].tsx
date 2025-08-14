import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import type { Routine } from '~/types/routine';
import { loadAll } from '~/lib/routines';

export default function RoutinePreview() {
  const { id, data } = useLocalSearchParams<{ id?: string; data?: string }>();
  const [routine, setRoutine] = React.useState<Routine | null>(null);

  React.useEffect(() => {
    (async () => {
      if (data) { setRoutine(JSON.parse(String(data))); return; }
      const all = await loadAll();
      setRoutine(all.find(r => r.id === id) ?? null);
    })();
  }, [id, data]);

  if (!routine) return null;

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ color: 'white', fontSize: 22 }}>{routine.title}</Text>
      <Text style={{ color: '#bbb' }}>{Math.round(routine.totalTimeSec/60)} min • {routine.tags.join(' • ')}</Text>

      <FlatList
        style={{ flex: 1 }}
        data={routine.steps}
        keyExtractor={s => s.id}
        renderItem={({ item, index }) => (
          <View style={{ backgroundColor: '#111', padding: 12, borderRadius: 12, marginBottom: 8 }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>{index+1}. {item.title}</Text>
            <Text style={{ color: '#bbb' }}>
              {item.type !== 'reps' ? `${item.durationSec ?? 0}s` : `${item.reps ?? 0} reps`} {item.restSec ? `• descanso ${item.restSec}s` : ''}
            </Text>
            {!!item.description && <Text style={{ color: '#ccc', marginTop: 4 }}>{item.description}</Text>}
          </View>
        )}
      />

      <Link href={`/routine/${routine.id}/play`} asChild>
        <TouchableOpacity style={{ backgroundColor: '#2ee58a', padding: 14, borderRadius: 12 }}>
          <Text style={{ color: 'black', fontWeight: '700', textAlign: 'center' }}>Start Training</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
