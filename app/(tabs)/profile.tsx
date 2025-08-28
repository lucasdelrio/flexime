import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Link } from 'expo-router';
import {
  CaretRight,
  Bell,
  Question,
  Info,
  ArrowSquareOut,
  ShoppingBag,
} from 'phosphor-react-native';

const BG = '#0D0C0F';
const CARD = '#1B1B1B';
const WHITE = '#FFFFFF';
const MUTED = '#6F6F6F';

export default function Profile() {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <View style={{ padding: 20, gap: 28 }}>
        {/* Header */}
        <View>
          <Text style={{ color: MUTED, fontSize: 16 }}>Profile</Text>
          <Text style={{ color: WHITE, fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold' }}>
            Hey, Lucas
          </Text>
        </View>

        {/* Preferences */}
        <View style={{ gap: 12 }}>
          <Text style={{ color: MUTED, fontSize: 14, marginBottom: 4 }}>Preferences</Text>

          {/* Workouts row */}
          <Link href="/settings" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: CARD,
                borderRadius: 14,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={{ color: WHITE, fontSize: 16, fontFamily: 'SpaceGrotesk_700Bold' }}>
                  Workouts
                </Text>
                <Text style={{ color: MUTED, fontSize: 14, marginTop: 4 }}>
                  Voice ON • Haptics OFF • Countdown ON
                </Text>
              </View>
              <CaretRight color={WHITE} size={20} />
            </TouchableOpacity>
          </Link>

          {/* Notifications row */}
          <View
            style={{
              backgroundColor: CARD,
              borderRadius: 14,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Bell color={WHITE} size={20} />
              <Text style={{ color: WHITE, fontSize: 16, fontFamily: 'SpaceGrotesk_700Bold' }}>
                Notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#444', true: '#888' }}
              thumbColor={notifications ? WHITE : '#bbb'}
            />
          </View>
        </View>

        {/* About Flexime */}
        <View style={{ gap: 12 }}>
          <Text style={{ color: MUTED, fontSize: 14, marginBottom: 4 }}>About Flexime</Text>

          <Row icon={<ShoppingBag color={WHITE} size={20} />} title="Restore purchase" />
          <Row icon={<Question color={WHITE} size={20} />} title="FAQs" />
          <Row icon={<Info color={WHITE} size={20} />} title="Privacy policy" />
        </View>

        {/* Log out */}
        <TouchableOpacity
          style={{
            backgroundColor: CARD,
            borderRadius: 14,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <ArrowSquareOut color={WHITE} size={20} />
          <Text style={{ color: WHITE, fontSize: 16, fontFamily: 'SpaceGrotesk_700Bold' }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Reusable row for About section
function Row({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: CARD,
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {icon}
      <Text style={{ color: WHITE, fontSize: 16, fontFamily: 'SpaceGrotesk_700Bold' }}>{title}</Text>
    </TouchableOpacity>
  );
}
