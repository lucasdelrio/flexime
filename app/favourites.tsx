// app/favourites.tsx
import { View, Text } from 'react-native';

export default function Favourites() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0C0F', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>
        Favourites
      </Text>
      <Text style={{ color: '#6F6F6F' }}>
        Coming soon — you’ll see all the routines you star here.
      </Text>
    </View>
  );
}
