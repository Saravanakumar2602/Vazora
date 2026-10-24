import { Stack } from 'expo-router';
import { Colors } from '@/src/theme';

export default function DriverLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.backgroundBase },
        animation: 'slide_from_right',
      }}
    />
  );
}
