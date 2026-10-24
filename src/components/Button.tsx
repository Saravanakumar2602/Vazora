import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/src/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.82}
      style={[
        styles.base,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        variant === 'primary' && !isDisabled && Shadows.primary,
        variant === 'accent' && !isDisabled && Shadows.accent,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'ghost' || variant === 'secondary'
              ? Colors.primary
              : Colors.white
          }
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            styles[`labelSize_${size}`],
            styles[`labelVariant_${variant}`],
            isDisabled && styles.labelDisabled,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },

  // Sizes
  size_sm: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[4], minHeight: 38 },
  size_md: { paddingVertical: Spacing[3], paddingHorizontal: Spacing[5], minHeight: 46 },
  size_lg: { paddingVertical: Spacing[4], paddingHorizontal: Spacing[6], minHeight: 56 },

  // Variants
  variant_primary: { backgroundColor: Colors.primary },
  variant_accent: { backgroundColor: Colors.accent },
  variant_secondary: {
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  variant_ghost: { backgroundColor: Colors.transparent },
  variant_danger: { backgroundColor: Colors.error },

  disabled: { opacity: 0.45 },

  // Label base
  label: {
    fontFamily: Typography.fontFamilySemiBold,
    letterSpacing: Typography.trackingWide,
  },
  labelSize_sm: { fontSize: Typography.sm },
  labelSize_md: { fontSize: Typography.base },
  labelSize_lg: { fontSize: Typography.md },

  // Label colors per variant
  labelVariant_primary: { color: Colors.white },
  labelVariant_accent: { color: Colors.textInverse },
  labelVariant_secondary: { color: Colors.primary },
  labelVariant_ghost: { color: Colors.textSecondary },
  labelVariant_danger: { color: Colors.white },
  labelDisabled: { opacity: 0.6 },
});
