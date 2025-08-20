// src/store/routines.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Routine } from "~/types/routine";

// Keys
const INDEX_KEY = "routines:index";
const K = (id: string) => `routine:${id}`;

async function getIndex(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(INDEX_KEY);
  return raw ? JSON.parse(raw) : [];
}
async function setIndex(ids: string[]) {
  await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(ids));
}

// CRUD
export async function saveRoutine(r: Routine): Promise<void> {
  const ids = await getIndex();
  if (!ids.includes(r.id)) {
    ids.push(r.id);
    await setIndex(ids);
  }
  await AsyncStorage.setItem(K(r.id), JSON.stringify(r));
}

export async function loadRoutine(id: string): Promise<Routine | null> {
  const raw = await AsyncStorage.getItem(K(id));
  return raw ? (JSON.parse(raw) as Routine) : null;
}

export async function loadAll(): Promise<Routine[]> {
  const ids = await getIndex();
  if (!ids.length) return [];
  const pairs = await AsyncStorage.multiGet(ids.map(K));
  return pairs
    .map(([, v]) => (v ? (JSON.parse(v) as Routine) : null))
    .filter(Boolean) as Routine[];
}

export async function deleteRoutine(id: string): Promise<void> {
  const ids = await getIndex();
  await AsyncStorage.multiRemove([K(id)]);
  await setIndex(ids.filter((x) => x !== id));
}

/**
 * Sum total duration of a list of routines.
 * - If the Routine has `totalTimeSec`, use that.
 * - Otherwise fall back to summing each step's `durationSec + restSec`.
 */
export function sumDurations(rs: Routine[]): number {
  return rs.reduce((acc, r) => {
    // Prefer already-computed total if present
    const fromRoutine = (r as any).totalTimeSec as number | undefined;

    if (typeof fromRoutine === "number") {
      return acc + fromRoutine;
    }

    // Fallback: sum steps
    const fromSteps =
      r.steps?.reduce((t, s: any) => {
        const main = typeof s?.durationSec === "number" ? s.durationSec : 0;
        const rest = typeof s?.restSec === "number" ? s.restSec : 0;
        return t + main + rest;
      }, 0) ?? 0;

    return acc + fromSteps;
  }, 0);
}

// Optional: first-run preload (e.g., bundled defaults)
export async function preloadRoutines(defaults: Routine[]) {
  const ids = await getIndex();
  if (ids.length) return;
  for (const r of defaults) await saveRoutine(r);
}
