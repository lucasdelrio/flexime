import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type Variant = 'fullBody' | 'shoulders' | 'hips' | 'footAnkle' | 'lowBack' | 'spine';

type Props = {
  title: string;
  subtitle?: string;
  variant?: Variant;
  height?: number;
  rounded?: number;
};

const PALETTES: Record<Variant, [string, string]> = {
  fullBody:  ['#242424', '#16AA78'],
  shoulders: ['#242440', '#844ACF'],
  hips:      ['#242430', '#E88F17'],
  footAnkle: ['#182A42', '#41B3FF'],
  lowBack:   ['#2C1C1C', '#ED5565'],
  spine:     ['#1C2C20', '#7CDE66'],
};

function IconFor({ variant }: { variant: Variant | undefined }) {
  switch (variant) {
    case 'fullBody':  return <Ionicons name="body" size={28} color="white" />;
    case 'shoulders': return <MaterialCommunityIcons name="arm-flex" size={28} color="white" />;
    case 'hips':      return <MaterialCommunityIcons name="human-male" size={28} color="white" />;
    case 'footAnkle': return <MaterialCommunityIcons name="foot-print" size={28} color="white" />;
    case 'lowBack':   return <MaterialCommunityIcons name="spine" size={28} color="white" />;
    case 'spine':     return <MaterialCommunityIcons name="spine" size={28} color="white" />;
    default:          return null;
  }
}

export default function CoverCard({
  title,
  subtitle,
  variant = 'fullBody',
  height = 160,
  rounded = 16,
}: Props) {
  const [c1, c2] = PALETTES[variant];

  return (
    <View style={{ borderRadius: rounded, overflow: 'hidden' }}>
      <LinearGradient
        colors={[c1, c2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height, padding: 16, justifyContent: 'space-between' }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <IconFor variant={variant} />
        </View>

        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.28)',
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 4,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
          {!!subtitle && (
            <Text style={{ color: '#E6E6E6' }} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}
