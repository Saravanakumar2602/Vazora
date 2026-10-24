import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Colors, Typography } from '@/src/theme';

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  return (
    <Text style={{ fontSize: 22, opacity: active ? 1 : 0.45 }}>{icon}</Text>
  );
}

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundSurface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: {
          fontFamily: Typography.fontFamilyMedium,
          fontSize: 11,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon icon="🏠" active={focused} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon icon="👤" active={focused} />,
        }}
      />
    </Tabs>
  );
}
