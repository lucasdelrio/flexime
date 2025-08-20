// src/lib/routines.ts
// Web-safe routines storage using AsyncStorage (no expo-file-system)

import type { Routine } from "~/types/routine";
import PRELOADED from "../../assets/routines/registry";

import {
  saveRoutine as saveRoutineStore,
  loadRoutine as loadRoutineStore,
  loadAll as loadAllStore,
  deleteRoutine as deleteRoutineStore,
  sumDurations as sumDurationsStore,
  preloadRoutines,
} from "~/store/routines";

// Return the routines you bundled inside assets (preloaded defaults)
export async function loadPreloaded(): Promise<Routine[]> {
  return PRELOADED as unknown as Routine[];
}

// Load both preloaded + user-saved routines
export async function loadAll(): Promise<Routine[]> {
  // Make sure defaults are saved at least once
  await preloadRoutines(PRELOADED as unknown as Routine[]);
  return loadAllStore();
}

// Re-export the helpers from the store
export const saveRoutine = saveRoutineStore;
export const loadRoutine = loadRoutineStore;
export const deleteRoutine = deleteRoutineStore;

// Keep the same signature you had before: sumDurations(steps)
export function sumDurations(steps: Routine["steps"]): number {
  return steps.reduce((acc, s) => {
    const main = s.durationSec ?? 0;
    const rest = s.restSec ?? 0;
    return acc + main + rest;
  }, 0);
}
