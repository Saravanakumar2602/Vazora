import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/src/theme';
import { Button, VazoraLogo, DevModeBanner } from '@/src/components';
import { verifyOtp, sendOtp, DEV_OTP_HINT } from '@/src/services/mockAuth';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    phone: string;
    dialCode: string;
    displayPhone: string;
  }>();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleOtpChange = (text: string, index: number) => {
    const char = text.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    if (error) setError(null);

    // Auto-advance
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all filled
    if (char && index === OTP_LENGTH - 1 && newOtp.every(Boolean)) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = useCallback(
    async (otpValue?: string) => {
      const code = otpValue ?? otp.join('');
      if (code.length !== OTP_LENGTH) {
        setError(`Please enter all ${OTP_LENGTH} digits.`);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await verifyOtp(params.phone ?? '', code);
        if (result.success) {
          router.replace('/(customer)/home');
        } else {
          setError(result.error ?? 'Invalid OTP. Please try again.');
          // Clear OTP on failure
          setOtp(Array(OTP_LENGTH).fill(''));
          inputRefs.current[0]?.focus();
        }
      } finally {
        setLoading(false);
      }
    },
    [otp, params.phone, router]
  );

  const handleResend = async () => {
    if (resendCooldown > 0 || resendLoading) return;
    setResendLoading(true);
    setError(null);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    try {
      await sendOtp({ phone: params.phone ?? '', countryCode: params.dialCode ?? '+91' });
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } finally {
      setResendLoading(false);
    }
  };

  const filledCount = otp.filter(Boolean).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <VazoraLogo size="sm" />
            <Text style={styles.title}>Verify your number</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to{'\n'}
              <Text style={styles.phoneHighlight}>{params.displayPhone}</Text>
            </Text>
          </View>

          {/* DEV ONLY hint */}
          {__DEV__ && (
            <View style={styles.devHint}>
              <Text style={styles.devHintLabel}>🛠 Dev Mode OTP</Text>
              <Text style={styles.devHintCode}>{DEV_OTP_HINT}</Text>
              <Text style={styles.devHintNote}>No real SMS was sent</Text>
            </View>
          )}

          <DevModeBanner message={`🛠 DEV MODE — Use OTP: ${DEV_OTP_HINT}. No real SMS sent.`} />

          {/* OTP input boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputRefs.current[index] = ref; }}
                style={[
                  styles.otpBox,
                  digit && styles.otpBoxFilled,
                  error && styles.otpBoxError,
                ]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                textAlign="center"
                accessibilityLabel={`OTP digit ${index + 1}`}
                caretHidden
              />
            ))}
          </View>

          {error && (
            <Text style={styles.errorText} accessibilityRole="alert">
              {error}
            </Text>
          )}

          <Button
            label="Verify"
            onPress={() => handleVerify()}
            loading={loading}
            disabled={filledCount < OTP_LENGTH}
            fullWidth
            size="lg"
          />

          {/* Resend section */}
          <View style={styles.resendRow}>
            <Text style={styles.resendPrompt}>Didn't receive the code? </Text>
            {resendCooldown > 0 ? (
              <Text style={styles.resendTimer}>
                Resend in {resendCooldown}s
              </Text>
            ) : (
              <TouchableOpacity
                onPress={handleResend}
                disabled={resendLoading}
                accessibilityRole="button"
                accessibilityLabel="Resend OTP"
              >
                <Text style={styles.resendLink}>
                  {resendLoading ? 'Sending…' : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundBase,
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[10],
    gap: Spacing[6],
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamilyMedium,
  },

  header: { gap: Spacing[3] },
  title: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['3xl'],
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingTight,
  },
  subtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: Typography.base * 1.5,
  },
  phoneHighlight: {
    fontFamily: Typography.fontFamilySemiBold,
    color: Colors.textPrimary,
  },

  // DEV hint
  devHint: {
    backgroundColor: Colors.backgroundSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    alignItems: 'center',
    gap: Spacing[1],
  },
  devHintLabel: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: Typography.trackingWide,
  },
  devHintCode: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['4xl'],
    color: Colors.accent,
    letterSpacing: 12,
  },
  devHintNote: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
  },

  // OTP boxes
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing[2] + 2,
  },
  otpBox: {
    width: 48,
    height: 60,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['2xl'],
    color: Colors.textPrimary,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryMuted,
  },
  otpBoxError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorMuted,
  },

  errorText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.error,
    textAlign: 'center',
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  resendPrompt: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  resendTimer: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.sm,
    color: Colors.textTertiary,
  },
  resendLink: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.sm,
    color: Colors.primary,
  },
});
