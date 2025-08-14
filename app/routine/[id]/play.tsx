import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useKeepAwake } from 'expo-keep-awake';
import type { Routine, RoutineStep } from '~/types/routine';
import { loadAll } from '~/lib/routines';
import { useSettings } from '~/store/settings';

function useCountdown(enabled: boolean, onDone: () => void) {
  const [count, setCount] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (!enabled) return;
    setCount(3);
    const t = setInterval(() => {
      setCount((c) => {
        if (c === null) return c;
        if (c <= 1) { clearInterval(t); onDone(); return null; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [enabled]);
  return count;
}

function useStepTimer(step: RoutineStep | null, onDone: () => void, voice: boolean, haptics: boolean) {
  const [remaining, setRemaining] = React.useState(step?.durationSec ?? 0);
  React.useEffect(() => { setRemaining(step?.durationSec ?? 0); }, [step?.id]);

  React.useEffect(() => {
    if (!step || step.type === 'reps' || !step.durationSec) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { clearInterval(t); onDone(); return 0; }
        const next = r - 1;
        if (step.cues?.includes('halfway') && next === Math.floor((step.durationSec ?? 0) / 2)) {
          if (voice) Speech.speak('Mitad');
          if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [step?.id, voice, haptics]);

  return remaining;
}

export default function Play() {
  useKeepAwake();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const [routine, setRoutine] = React.useState<Routine | null>(null);
  const [idx, setIdx] = React.useState(0);
  const { settings, loaded } = useSettings();
  const step = routine?.steps[idx] ?? null;

  React.useEffect(() => {
    (async () => {
      const all = await loadAll();
      setRoutine(all.find(r => r.id === id) ?? null);
    })();
  }, [id]);

  React.useEffect(() => {
    if (!step || !loaded) return;
    if (settings.voiceEnabled) Speech.speak(step.title);
    if (settings.hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [step?.id, loaded]);

  const [ready, setReady] = React.useState(false);
  const count = useCountdown(loaded && settings.countdownEnabled && !ready, () => setReady(true));
  const remaining = useStepTimer(
    ready ? step : null,
    () => {
      if (settings.voiceEnabled) Speech.speak('Tiempo');
      if (settings.hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      const rest = step?.restSec ?? 0;
      if (rest > 0) {
        setTimeout(() => setIdx(i => Math.min(i + 1, (routine?.steps.length ?? 1) - 1)), rest * 1000);
      } else {
        setIdx(i => Math.min(i + 1, (routine?.steps.length ?? 1) - 1));
      }
      setReady(false); // next step will countdown again if enabled
    },
    settings.voiceEnabled,
    settings.hapticsEnabled
  );

  if (!routine || !step || !loaded) return null;

  return (
    <View style={{ flex: 1, padding: 24, gap: 24, backgroundColor: 'black' }}>
      <Text style={{ color: 'white', fontSize: 20 }}>{routine.title}</Text>
      <Text style={{ color: '#aaa' }}>Paso {idx+1} de {routine.steps.length}</Text>

      <View style={{ height: 260, borderRadius: 130, borderWidth: 8, borderColor: '#333', alignItems: 'center', justifyContent: 'center' }}>
        {count !== null ? (
          <Text style={{ color: 'white', fontSize: 64, fontWeight: '800' }}>{count}</Text>
        ) : (
          <>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: '600', marginBottom: 8 }}>{step.title}</Text>
            {step.type !== 'reps' ? (
              <Text style={{ color: '#bbb', fontSize: 18 }}>{remaining}s</Text>
            ) : (
              <Text style={{ color: '#bbb', fontSize: 18 }}>{step.reps} reps</Text>
            )}
          </>
        )}
      </View>

      {!!step.description && <Text style={{ color: '#ddd' }}>{step.description}</Text>}

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity onPress={() => { setIdx(i => Math.max(0, i - 1)); setReady(false); }} style={{ backgroundColor: '#1f1f1f', padding: 16, borderRadius: 12 }}>
          <Text style={{ color: 'white' }}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIdx(i => Math.min(i + 1, routine.steps.length - 1)); setReady(false); }} style={{ backgroundColor: '#1f1f1f', padding: 16, borderRadius: 12 }}>
          <Text style={{ color: 'white' }}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#222', padding: 16, borderRadius: 12 }}>
          <Text style={{ color: 'white' }}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
