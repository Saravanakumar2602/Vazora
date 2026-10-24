import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/src/theme';

interface DevModeBannerProps {
  message?: string;
}

/**
 * ⚠️  DEV ONLY — Visible indicator that the app is running in mock/dev mode.
 * Remove or gate this component behind `__DEV__` checks before production.
 */
export function DevModeBanner({
  message = '🛠 DEV MODE — Mock authentication active. No real OTPs or data.',
}: DevModeBannerProps) {
  if (!__DEV__) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.warningMuted,
    borderWidth: 1,
    borderColor: Colors.warning,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    marginBottom: Spacing[4],
    width: '100%',
  },
  text: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.warning,
    textAlign: 'center',
    letterSpacing: Typography.trackingNormal,
  },
});
