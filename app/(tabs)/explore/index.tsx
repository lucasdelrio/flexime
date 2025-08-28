// app/(tabs)/explore/index.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'phosphor-react-native';
import { Link } from 'expo-router';

export const options = { headerShown: false }; // use custom in-page header

const BG = '#0D0C0F';
const WHITE = '#FFFFFF';
const MUTED = '#6F6F6F';
const CARD_RADIUS = 14;

// Match your sections & labels
const SECTIONS: {
  title: string;
  items: { tag: string; label: string }[];
}[] = [
  {
    title: 'Upper-body',
    items: [
      { tag: 'neck', label: 'Neck' },
      { tag: 'upper-back', label: 'Upper-back' },
      { tag: 'shoulders', label: 'Shoulders' },
      { tag: 'arms', label: 'Arms & wrists' },
    ],
  },
  {
    title: 'Core & spine',
    items: [
      { tag: 'spine', label: 'Spine' },
      { tag: 'lower-back', label: 'Lower-back' },
    ],
  },
  {
    title: 'Lower-body',
    items: [
      { tag: 'hips', label: 'Hips & glutes' },
      { tag: 'hamstrings', label: 'Hamstrings' },
      { tag: 'quads', label: 'Quads' },
      { tag: 'knees', label: 'Knees' },
      { tag: 'ankles', label: 'Ankles & feet' },
      { tag: 'calves', label: 'Calves' },
    ],
  },
];

// 2-column grid sizes (responsive)
const SCREEN_W = Dimensions.get('window').width;
const H_PADDING = 20;
const GAP = 12;
const COL_W = (SCREEN_W - H_PADDING * 2 - GAP) / 2; // 2 columns with gap
const CARD_AR = 1.3; // aspect ratio ~ your mock
const CARD_H = COL_W / CARD_AR;

export default function Explore() {
  const insets = useSafeAreaInsets();
  const TAB_HEIGHT = 60; // keep in sync with your Tabs layout height

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <FlatList
        data={SECTIONS}
        keyExtractor={(s) => s.title}
        contentContainerStyle={{
          paddingHorizontal: H_PADDING,
          paddingTop: 16,
          paddingBottom: TAB_HEIGHT + insets.bottom + 16, // keep grid above tab bar
          gap: 28,
        }}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <View>
              <Text style={{ color: MUTED, fontSize: 16, marginBottom: 2 }}>Workouts</Text>
              <Text
                style={{
                  color: WHITE,
                  fontSize: 28,
                  fontFamily: 'SpaceGrotesk_700Bold',
                }}
              >
                Explore
              </Text>
            </View>

            <Link href="/favourites" asChild>
              <TouchableOpacity
                accessibilityRole="button"
                style={{
                  backgroundColor: '#1B1B1B',
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Heart color={WHITE} size={20} />
              </TouchableOpacity>
            </Link>
          </View>
        }
        renderItem={({ item: section }) => (
          <View>
            <Text style={{ color: MUTED, fontSize: 14, marginBottom: 12 }}>{section.title}</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}>
              {section.items.map((it) => (
                <Link key={it.tag} href={`./${it.tag}`} asChild>
                  <TouchableOpacity
                    style={{
                      width: COL_W,
                      height: CARD_H,
                      borderRadius: CARD_RADIUS,
                      overflow: 'hidden',
                    }}
                    activeOpacity={0.9}
                  >
                    {/* Placeholder art; swap for per-tag images/gradients later */}
                    <ImageBackground
                      source={{ uri: 'https://picsum.photos/600/600?blur=3' }}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      imageStyle={{ borderRadius: CARD_RADIUS }}
                    >
                      <Text
                        style={{
                          color: WHITE,
                          fontSize: 16,
                          fontFamily: 'SpaceGrotesk_700Bold',
                          textAlign: 'center',
                          paddingHorizontal: 8,
                        }}
                      >
                        {it.label}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
