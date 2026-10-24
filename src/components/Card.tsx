import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/src/theme';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  noPadding?: boolean;
}

export function Card({
  children,
  title,
  subtitle,
  style,
  elevated = false,
  noPadding = false,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        elevated && Shadows.md,
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    padding: Spacing[5],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  elevated: {
    backgroundColor: Colors.backgroundElevated,
  },
  noPadding: {
    padding: 0,
  },
  header: {
    marginBottom: Spacing[4],
    gap: Spacing[1],
  },
  title: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.lg,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
});
