import React from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { Routine, RoutineStep } from '~/types/routine';
import { sumDurations, saveRoutine } from '~/lib/routines';

function bulletsToSteps(text: string): RoutineStep[] {
  return text
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map((line, i) => ({
      id: `${Date.now()}-${i}`,
      title: line,
      type: 'hold',
      durationSec: 40,
      restSec: 15,
      cues: ['start','end'],
    }));
}

export default function Build() {
  const { title = 'Mi nueva rutina', bullets = '' } = useLocalSearchParams<{ title?: string; bullets?: string }>();
  const router = useRouter();
  const [steps, setSteps] = React.useState<RoutineStep[]>(() => bulletsToSteps(String(bullets)));
  const total = sumDurations(steps);

  const addStep = () => {
    setSteps(prev => [
      ...prev,
      { id: `${Date.now()}`, title: 'Nuevo paso', type: 'hold', durationSec: 30, restSec: 10, cues: ['start','end'] },
    ]);
  };

  const updateStep = (id: string, patch: Partial<RoutineStep>) => {
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, ...patch } : s)));
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 4 }}>{String(title)}</Text>
      <Text style={{ color: '#bbb' }}>{Math.round(total/60)} min estimados</Text>

      <FlatList
        style={{ flex: 1 }}
        data={steps}
        keyExtractor={s => s.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#111', padding: 12, borderRadius: 12, marginBottom: 10 }}>
            <TextInput
              value={item.title}
              onChangeText={(t) => updateStep(item.id, { title: t })}
              style={{ color: 'white', fontSize: 16, marginBottom: 8 }}
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TextInput
                keyboardType="numeric"
                value={String(item.durationSec ?? 0)}
                onChangeText={(t) => updateStep(item.id, { durationSec: Number(t || 0) })}
                style={{ backgroundColor: '#151515', color: 'white', padding: 10, borderRadius: 8, width: 90 }}
                placeholder="dur (s)"
                placeholderTextColor="#666"
              />
              <TextInput
                keyboardType="numeric"
                value={String(item.restSec ?? 0)}
                onChangeText={(t) => updateStep(item.id, { restSec: Number(t || 0) })}
                style={{ backgroundColor: '#151515', color: 'white', padding: 10, borderRadius: 8, width: 90 }}
                placeholder="rest (s)"
                placeholderTextColor="#666"
              />
              <TouchableOpacity onPress={() => setSteps(prev => prev.filter(s => s.id !== item.id))}
                style={{ backgroundColor: '#2b2b2b', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#ff9f9f' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity onPress={addStep} style={{ backgroundColor: '#1f1f1f', padding: 14, borderRadius: 12 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>+ Agregar paso</Text>
          </TouchableOpacity>
        }
      />

      <TouchableOpacity
        onPress={async () => {
          const routine: Routine = {
            id: `user-${Date.now()}`,
            title: String(title),
            coverVariant: 'fullBody',
            totalTimeSec: total,
            source: { kind: 'text', notes: 'Creado manualmente' },
            meta: { createdAt: Date.now(), createdBy: 'user', language: 'es-AR', license: 'private' },
            tags: ['full-body'],
            steps,
          };
          await saveRoutine(routine);
          // Navigate to the persisted preview by id
          router.push({ pathname: `/routine/${routine.id}` });
        }}
        style={{ backgroundColor: '#2ee58a', padding: 14, borderRadius: 12 }}
      >
        <Text style={{ color: 'black', fontWeight: '700', textAlign: 'center' }}>Guardar & Previsualizar</Text>
      </TouchableOpacity>
    </View>
  );
}
