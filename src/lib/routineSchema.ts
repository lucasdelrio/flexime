// src/lib/routineSchema.ts
import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  mode: z.enum(["time", "reps", "cycles"]),
  duration_seconds: z.number().optional(),
  reps: z.number().optional(),
  cycles: z.number().optional(),
  sets: z.number().default(1),
  sides: z.enum(["none", "left_right", "bilateral_split", "sequence"]),
  per_side: z.boolean().optional(),
  split: z.object({
    left_seconds: z.number().optional(),
    right_seconds: z.number().optional(),
  }).optional(),
  sequence: z.array(z.object({
    name: z.string(),
    seconds: z.number(),
  })).optional(),
  instructions: z.array(z.string()),
  coaching_cues: z.array(z.string()),
  benefits: z.array(z.string()),
});

export const RoutineSchema = z.object({
  routine_id: z.string(),
  title: z.string(),
  estimated_duration_minutes: z.number(),
  equipment: z.array(z.string()),
  tags: z.array(z.string()),
  exercises: z.array(ExerciseSchema).min(1),
});

export type Routine = z.infer<typeof RoutineSchema>;
