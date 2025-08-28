// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Heart, Play } from 'phosphor-react-native';
import { loadAll } from '~/lib/routines';
import type { Routine } from '~/types/routine';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#0D0C0F';
const CARD = '#1B1B1B';
const WHITE = '#FFFFFF';
const MUTED = '#6F6F6F';

function formatToday(): string {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' }); // "Sunday"
  const day = d.getDate(); // 24
  return `${weekday} ${day}`;
}

export default function Today() {
  const [routines, setRoutines] = React.useState<Routine[]>([]);
  React.useEffect(() => { (async () => setRoutines(await loadAll()))(); }, []);

  // Map UI cards → your preloaded routines
  const morning = routines.find(r => r.id === 'full_body_wakeup');
  const posture = routines.find(r => r.id === 'shoulder_reset');
  const hips = routines.find(r => r.id === 'hip_opener');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView 
        style={{ flex: 1, backgroundColor: BG }} 
        contentContainerStyle={{ padding: 16, gap: 20, backgroundColor: BG }}
      >
        {/* Header row: date + favourites */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <Text style={{ color: MUTED }}>{formatToday()}</Text>

          <Link href="/favourites" asChild>
            <TouchableOpacity
              accessibilityRole="button"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: 10,
                borderRadius: 12,
              }}
            >
              <Heart color={WHITE} weight="bold" size={20} />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Section 1 */}
        <SectionTitle>Start your day</SectionTitle>
        <ActionCard
          title="Morning movement"
          subtitle={morning ? `${Math.round(morning.totalTimeSec / 60)} min · ${morning.steps.length} exercises` : '10 min · 6 exercises'}
          description="Active your body and stay out of pain"
          onPressPlayHref={morning ? `/routine/${morning.id}/play` : undefined}
        />

        {/* Section 2 */}
        <SectionTitle>Time to stand up</SectionTitle>
        <ActionCard
          title="Posture correction"
          subtitle={posture ? `${Math.round(posture.totalTimeSec / 60)} min · ${posture.steps.length} exercises` : '3–4 min · 3 exercises'}
          description="Relieve tension and reduce forward shoulder posture"
          onPressPlayHref={posture ? `/routine/${posture.id}/play` : undefined}
        />

        {/* Section 3 */}
        <SectionTitle>Before sleep</SectionTitle>
        <ActionCard
          title="Unlock your hips"
          subtitle={hips ? `${Math.round(hips.totalTimeSec / 60)} min · ${hips.steps.length} exercises` : '3–4 min · 3 exercises'}
          description="Deeper recovery while you sleep"
          onPressPlayHref={hips ? `/routine/${hips.id}/play` : undefined}
        />

        {/* bottom padding */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        color: 'white',
        fontSize: 28,
        marginTop: 6,
        fontFamily: 'SpaceGrotesk_700Bold', // Title font
      }}
    >
      {children}
    </Text>
  );
}

function ActionCard({
  title,
  subtitle,
  description,
  onPressPlayHref,
}: {
  title: string;
  subtitle: string;
  description: string;
  onPressPlayHref?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: CARD,
        borderRadius: 18,
        padding: 16,
        alignItems: 'flex-start',
      }}
    >
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: 'white', fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' }}>
            {title}
          </Text>
          <Text style={{ color: MUTED, marginTop: 4 /* Work Sans default applies */ }}>
            {subtitle}
          </Text>
          <Text style={{ color: MUTED, marginTop: 8 /* Work Sans default applies */ }}>
            {description}
          </Text>
        </View>

        <Link href={onPressPlayHref ?? ''} asChild>
          <TouchableOpacity
            disabled={!onPressPlayHref}
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: 12,
              borderRadius: 12,
              opacity: onPressPlayHref ? 1 : 0.5,
            }}
          >
            <Play color={WHITE} size={20} weight="fill" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
