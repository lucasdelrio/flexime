import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useSettings } from '~/store/settings';

export default function Settings() {
  const { settings, update, loaded } = useSettings();
  if (!loaded) return null;

  return (
    <View style={{ flex: 1, padding: 16, gap: 18 }}>
      <Text style={{ color: 'white', fontSize: 22, marginBottom: 8 }}>Ajustes</Text>

      <Row
        label="Voz (indicaciones habladas)"
        value={settings.voiceEnabled}
        onChange={(v) => update({ voiceEnabled: v })}
      />
      <Row
        label="Haptics (vibración)"
        value={settings.hapticsEnabled}
        onChange={(v) => update({ hapticsEnabled: v })}
      />
      <Row
        label="Cuenta regresiva 3-2-1"
        value={settings.countdownEnabled}
        onChange={(v) => update({ countdownEnabled: v })}
      />
    </View>
  );
}

function Row({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={{ backgroundColor: '#111', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}
