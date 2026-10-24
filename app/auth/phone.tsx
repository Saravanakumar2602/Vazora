import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/src/theme';
import { Button, InputField, VazoraLogo, DevModeBanner } from '@/src/components';
import { sendOtp } from '@/src/services/mockAuth';
import type { CountryCode } from '@/src/types';

const COUNTRY_CODES: CountryCode[] = [
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { name: 'UAE', code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺' },
];

function validatePhone(phone: string, dialCode: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return 'Phone number is required.';
  if (dialCode === '+91' && digits.length !== 10) return 'Enter a valid 10-digit Indian mobile number.';
  if (digits.length < 6) return 'Phone number is too short.';
  if (digits.length > 15) return 'Phone number is too long.';
  return null;
}

export default function PhoneScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleContinue = async () => {
    const validationError = validatePhone(phone, selectedCountry.dialCode);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await sendOtp({
        phone: phone.replace(/\D/g, ''),
        countryCode: selectedCountry.dialCode,
      });

      if (result.success) {
        router.push({
          pathname: '/auth/otp',
          params: {
            phone: phone.replace(/\D/g, ''),
            dialCode: selectedCountry.dialCode,
            displayPhone: `${selectedCountry.dialCode} ${phone}`,
          },
        });
      } else {
        setError(result.error ?? 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (error) setError(null);
  };

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
          {/* Back button */}
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
            <Text style={styles.title}>Enter your mobile number</Text>
            <Text style={styles.subtitle}>
              We&apos;ll send a one-time password to verify your identity.
            </Text>
          </View>

          <DevModeBanner />

          {/* Phone input group */}
          <View style={styles.phoneGroup}>
            <Text style={styles.fieldLabel}>Mobile Number</Text>
            <View style={styles.phoneRow}>
              {/* Country code picker trigger */}
              <TouchableOpacity
                style={styles.countryPicker}
                onPress={() => setPickerVisible(true)}
                accessibilityRole="button"
                accessibilityLabel={`Country code: ${selectedCountry.dialCode}`}
              >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
                <Text style={styles.chevron}>▾</Text>
              </TouchableOpacity>

              {/* Phone number input */}
              <View style={styles.phoneInputWrapper}>
                <InputField
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  placeholder={selectedCountry.code === 'IN' ? '98765 43210' : 'Phone number'}
                  maxLength={15}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                  error={undefined}
                />
              </View>
            </View>
            {error && (
              <Text style={styles.errorText} accessibilityRole="alert">
                {error}
              </Text>
            )}
          </View>

          <Button
            label="Continue"
            onPress={handleContinue}
            loading={loading}
            disabled={!phone.trim()}
            fullWidth
            size="lg"
          />

          <Text style={styles.privacyNote}>
            Your number is used only for identity verification. We do not share it with third parties.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country code picker modal */}
      <Modal
        visible={pickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Country Code</Text>
            <FlatList
              data={COUNTRY_CODES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryOption,
                    item.code === selectedCountry.code && styles.countryOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedCountry(item);
                    setPickerVisible(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryDial}>{item.dialCode}</Text>
                  {item.code === selectedCountry.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
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
    lineHeight: Typography['3xl'] * 1.2,
  },
  subtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: Typography.base * 1.5,
  },

  phoneGroup: { gap: Spacing[2] },
  fieldLabel: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    letterSpacing: Typography.trackingWide,
    textTransform: 'uppercase',
  },
  phoneRow: {
    flexDirection: 'row',
    gap: Spacing[2],
    alignItems: 'flex-start',
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1] + 2,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing[3],
    height: 56,
  },
  flag: { fontSize: 20 },
  dialCode: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  chevron: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  phoneInputWrapper: { flex: 1 },
  errorText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.error,
    marginTop: 2,
  },

  privacyNote: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 17,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.backgroundElevated,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    paddingBottom: Spacing[8],
    maxHeight: '75%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginVertical: Spacing[3],
  },
  modalTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.lg,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing[3],
    paddingHorizontal: Spacing[5],
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
  },
  countryOptionSelected: {
    backgroundColor: Colors.primaryMuted,
  },
  countryFlag: { fontSize: 22 },
  countryName: {
    flex: 1,
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  countryDial: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  checkmark: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: Typography.fontFamilyBold,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing[5],
  },
});
