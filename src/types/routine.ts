export type StepType = 'hold' | 'reps' | 'flow';
export type Cue = 'start' | 'halfway' | 'end' | 'breath';

export type RoutineStep = {
  id: string;
  title: string;
  description?: string;
  type: StepType;
  durationSec?: number;
  reps?: number;
  restSec?: number;
  cues?: Cue[];
  imageRefs?: string[];
};

export type RoutineSource = {
  kind: 'none' | 'video' | 'url' | 'text';
  url?: string;
  mediaUri?: string;
  notes?: string;
};

export type RoutineMeta = {
  createdAt: number;
  createdBy: 'user';
  language: string; // 'es-AR' | 'en-US'
  license?: 'private' | 'public';
};

export type CoverVariant =
  | 'fullBody'
  | 'shoulders'
  | 'hips'
  | 'footAnkle'
  | 'lowBack'
  | 'spine';

export type Routine = {
  id: string;
  title: string;
  coverVariant?: CoverVariant;
  totalTimeSec: number;
  source: RoutineSource;
  meta: RoutineMeta;
  tags: string[];
  steps: RoutineStep[];
};
