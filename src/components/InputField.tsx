import React, { forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/src/theme';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(function InputField(
  {
    label,
    error,
    hint,
    containerStyle,
    leftElement,
    rightElement,
    style,
    ...props
  },
  ref
) {
  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputRow,
          hasError && styles.inputRowError,
          props.editable === false && styles.inputRowDisabled,
        ]}
      >
        {leftElement && <View style={styles.sideElement}>{leftElement}</View>}

        <TextInput
          ref={ref}
          style={[styles.input, leftElement ? styles.inputWithLeft : null, style]}
          placeholderTextColor={Colors.textTertiary}
          selectionColor={Colors.primary}
          cursorColor={Colors.primary}
          {...props}
        />

        {rightElement && <View style={styles.sideElement}>{rightElement}</View>}
      </View>

      {hasError && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}
      {hint && !hasError && <Text style={styles.hintText}>{hint}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing[1] + 2,
  },
  label: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    letterSpacing: Typography.trackingWide,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
    minHeight: 56,
    paddingHorizontal: Spacing[4],
  },
  inputRowError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorMuted,
  },
  inputRowDisabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.md,
    color: Colors.textPrimary,
    paddingVertical: Spacing[3],
  },
  inputWithLeft: {
    paddingLeft: Spacing[2],
  },
  sideElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.error,
    marginTop: 2,
  },
  hintText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textTertiary,
    marginTop: 2,
  },
});
