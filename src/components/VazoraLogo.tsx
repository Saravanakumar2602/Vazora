import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Typography, Spacing } from '@/src/theme';

interface VazoraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  style?: StyleProp<ViewStyle>;
  light?: boolean;
}

const fontSizes = {
  sm: Typography['2xl'],
  md: Typography['3xl'],
  lg: Typography['4xl'],
  xl: Typography['5xl'],
};

const taglineSizes = {
  sm: Typography.xs,
  md: Typography.sm,
  lg: Typography.base,
  xl: Typography.md,
};

export function VazoraLogo({
  size = 'md',
  showTagline = false,
  style,
  light = false,
}: VazoraLogoProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoRow}>
        {/* Accent dot / indicator */}
        <View style={styles.accentDot} />
        <Text
          style={[
            styles.brandName,
            { fontSize: fontSizes[size] },
            light && styles.brandNameLight,
          ]}
          accessibilityRole="header"
        >
          VAZORA
        </Text>
      </View>
      {showTagline && (
        <Text
          style={[
            styles.tagline,
            { fontSize: taglineSizes[size] },
            light && styles.taglineLight,
          ]}
        >
          Your car. Your driver. Your way.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing[2],
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  accentDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    marginBottom: 4,
  },
  brandName: {
    fontFamily: Typography.fontFamilyExtraBold,
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingWidest,
  },
  brandNameLight: {
    color: Colors.white,
  },
  tagline: {
    fontFamily: Typography.fontFamilyRegular,
    color: Colors.textSecondary,
    letterSpacing: Typography.trackingWide,
    textAlign: 'center',
  },
  taglineLight: {
    color: 'rgba(255,255,255,0.7)',
  },
});
