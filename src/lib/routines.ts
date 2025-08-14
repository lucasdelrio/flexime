import * as FileSystem from 'expo-file-system';
import type { Routine } from '~/types/routine';
import PRELOADED from '../../assets/routines/registry';

const DIR = FileSystem.documentDirectory + 'routines/';

export async function ensureDir() {
  const info = await FileSystem.getInfoAsync(DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(DIR, { intermediates: true });
  }
}

export async function loadPreloaded(): Promise<Routine[]> {
  return PRELOADED as unknown as Routine[];
}

export async function loadUserSaved(): Promise<Routine[]> {
  await ensureDir();
  const files = await FileSystem.readDirectoryAsync(DIR);
  const routines: Routine[] = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const raw = await FileSystem.readAsStringAsync(DIR + file);
    routines.push(JSON.parse(raw));
  }
  return routines;
}

export async function loadAll(): Promise<Routine[]> {
  const [pre, user] = await Promise.all([loadPreloaded(), loadUserSaved()]);
  return [...pre, ...user];
}

export async function saveRoutine(r: Routine) {
  await ensureDir();
  const path = DIR + `${r.id}.json`;
  await FileSystem.writeAsStringAsync(path, JSON.stringify(r));
  return path;
}

export async function deleteRoutine(id: string) {
  await ensureDir();
  const path = DIR + `${id}.json`;
  const info = await FileSystem.getInfoAsync(path);
  if (info.exists) {
    await FileSystem.deleteAsync(path, { idempotent: true });
  }
}

export function sumDurations(steps: Routine['steps']): number {
  return steps.reduce((acc, s) => {
    const main = s.durationSec ?? 0;
    const rest = s.restSec ?? 0;
    return acc + main + rest;
  }, 0);
}
