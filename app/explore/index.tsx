import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const CATEGORIES = [
  { tag: 'full-body', label: 'Full Body' },
  { tag: 'legs', label: 'Legs' },
  { tag: 'hips', label: 'Hips' },
  { tag: 'shoulders', label: 'Shoulders' },
  { tag: 'back', label: 'Back' },
  { tag: 'spine', label: 'Spine' },
  { tag: 'foot', label: 'Foot/Ankle' },
  { tag: 'ankle', label: 'Ankle' },
];

export default function Explore() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 22, marginBottom: 12 }}>Explorar por zona</Text>
      {CATEGORIES.map((c) => (
        <Link key={c.tag} href={`/explore/${c.tag}`} asChild>
          <TouchableOpacity style={{ backgroundColor: '#151515', padding: 16, borderRadius: 12, marginBottom: 10 }}>
            <Text style={{ color: 'white' }}>{c.label}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
