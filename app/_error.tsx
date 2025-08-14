import { View, Text } from 'react-native';

export default function GlobalErrorBoundary({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: 'black', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 8 }}>Oops — algo falló</Text>
      <Text style={{ color: '#bbb' }}>{error.message}</Text>
    </View>
  );
}
