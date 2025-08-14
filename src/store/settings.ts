import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export type Settings = {
  voiceEnabled: boolean;
  hapticsEnabled: boolean;
  countdownEnabled: boolean; // 3-2-1 before each step
};

const DEFAULTS: Settings = {
  voiceEnabled: true,
  hapticsEnabled: true,
  countdownEnabled: true,
};

const KEY = 'flexime_settings_v1';

export function useSettings() {
  const [settings, setSettings] = React.useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const update = React.useCallback(async (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  }, [settings]);

  return { settings, update, loaded };
}
