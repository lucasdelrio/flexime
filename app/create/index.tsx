import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function Create() {
  const [title, setTitle] = React.useState('Mi nueva rutina');
  const [bullets, setBullets] = React.useState('Sentadilla profunda\nGato/Vaca\nRotación torácica');
  const router = useRouter();

  const onNext = () => {
    router.push({ pathname: '/create/build', params: { title, bullets } });
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ color: 'white', fontSize: 20 }}>Crear rutina</Text>

      <Text style={{ color: '#ccc' }}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor="#777"
        style={{ backgroundColor: '#111', color: 'white', padding: 12, borderRadius: 10 }}
      />

      <Text style={{ color: '#ccc', marginTop: 8 }}>Pega pasos (uno por línea)</Text>
      <TextInput
        value={bullets}
        onChangeText={setBullets}
        placeholder="Un paso por línea"
        placeholderTextColor="#777"
        multiline
        style={{ backgroundColor: '#111', color: 'white', padding: 12, borderRadius: 10, minHeight: 160 }}
      />

      <TouchableOpacity onPress={onNext} style={{ backgroundColor: '#2ee58a', padding: 14, borderRadius: 12 }}>
        <Text style={{ color: 'black', fontWeight: '700', textAlign: 'center' }}>Continuar</Text>
      </TouchableOpacity>

      <Link href="/" asChild>
        <TouchableOpacity style={{ backgroundColor: '#1f1f1f', padding: 14, borderRadius: 12 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
