import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/src/theme';
import { VazoraLogo, Button } from '@/src/components';

const STEPS = [
  {
    step: '01',
    icon: '📋',
    title: 'Submit Documents',
    description:
      'Upload your driving licence, Aadhaar card, a recent photo and any other required identity documents.',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Background Verification',
    description:
      'Our team reviews your documents and runs a standard background check. This typically takes 2–5 working days.',
  },
  {
    step: '03',
    icon: '✅',
    title: 'Admin Approval',
    description:
      "Once verified, our admin team approves your application. You'll receive a notification when you're ready to accept bookings.",
  },
  {
    step: '04',
    icon: '🚗',
    title: 'Start Accepting Trips',
    description:
      'After approval, you can log in as a driver and start receiving booking requests from customers.',
  },
];

const REQUIREMENTS = [
  'Valid Indian driving licence (LMV category or above)',
  'Government-issued photo ID (Aadhaar, PAN, Passport)',
  'Recent passport-size photograph',
  'Minimum age: 21 years',
  'Clean driving record — no major traffic violations',
  'Smartphone with internet access',
];

export default function DriverApplyScreen() {
  const router = useRouter();

  const handleContinue = () => {
    // Phase 1 — document upload not implemented
    console.log('[DRIVER APPLY] Document upload not implemented in Phase 1.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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

        {/* Header */}
        <View style={styles.heroSection}>
          <VazoraLogo size="md" />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Drive for VAZORA</Text>
            <Text style={styles.heroSubtitle}>
              Join our network of professional chauffeurs. Help customers travel in their own vehicles — on their terms.
            </Text>
          </View>

          {/* Key highlights */}
          <View style={styles.highlightsRow}>
            <View style={styles.highlight}>
              <Text style={styles.highlightIcon}>💰</Text>
              <Text style={styles.highlightText}>Competitive earnings</Text>
            </View>
            <View style={styles.highlight}>
              <Text style={styles.highlightIcon}>🕐</Text>
              <Text style={styles.highlightText}>Flexible hours</Text>
            </View>
            <View style={styles.highlight}>
              <Text style={styles.highlightIcon}>🛡️</Text>
              <Text style={styles.highlightText}>Trusted platform</Text>
            </View>
          </View>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeIcon}>⚠️</Text>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Approval Required Before Driving</Text>
            <Text style={styles.noticeBody}>
              Drivers must submit the required documents and receive explicit admin approval before they can accept any bookings. Approval is not automatic.
            </Text>
          </View>
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepList}>
            {STEPS.map((item, index) => (
              <View key={item.step} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepNumber}>{item.step}</Text>
                  </View>
                  {index < STEPS.length - 1 && <View style={styles.stepConnector} />}
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepIcon}>{item.icon}</Text>
                    <Text style={styles.stepTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={[styles.requirementsCard, Shadows.sm]}>
            {REQUIREMENTS.map((req, index) => (
              <View key={index} style={styles.requirementRow}>
                <Text style={styles.requirementBullet}>•</Text>
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Phase 1 notice */}
        <View style={styles.phase1Notice}>
          <Text style={styles.phase1NoticeText}>
            📌 Document submission and admin approval workflow are not yet available in this preview. This screen is a placeholder for the full driver onboarding flow.
          </Text>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Button
            label="Start My Application"
            onPress={handleContinue}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Button
            label="Go Back"
            onPress={() => router.back()}
            variant="ghost"
            size="md"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundBase,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing[5],
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

  // Hero
  heroSection: {
    alignItems: 'center',
    gap: Spacing[5],
  },
  heroText: { alignItems: 'center', gap: Spacing[3] },
  heroTitle: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['3xl'],
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: Typography.trackingTight,
  },
  heroSubtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.base * 1.5,
  },
  highlightsRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  highlight: {
    alignItems: 'center',
    gap: Spacing[1],
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    minWidth: 90,
  },
  highlightIcon: { fontSize: 22 },
  highlightText: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Notice
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.warningMuted,
    borderWidth: 1,
    borderColor: Colors.warning,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    gap: Spacing[3],
    alignItems: 'flex-start',
  },
  noticeIcon: { fontSize: 20, marginTop: 2 },
  noticeContent: { flex: 1, gap: Spacing[1] },
  noticeTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.warning,
  },
  noticeBody: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.warning,
    lineHeight: Typography.sm * 1.45,
    opacity: 0.85,
  },

  // Section
  section: { gap: Spacing[4] },
  sectionTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.xl,
    color: Colors.textPrimary,
  },

  // Steps
  stepList: { gap: 0 },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing[4],
    paddingBottom: Spacing[4],
  },
  stepLeft: { alignItems: 'center', width: 36 },
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.xs,
    color: Colors.primary,
  },
  stepConnector: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  stepContent: { flex: 1, gap: Spacing[1], paddingTop: Spacing[1] },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  stepIcon: { fontSize: 18 },
  stepTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  stepDescription: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.sm * 1.45,
  },

  // Requirements
  requirementsCard: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing[5],
    gap: Spacing[3],
  },
  requirementRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    alignItems: 'flex-start',
  },
  requirementBullet: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography.base,
    color: Colors.primary,
    lineHeight: Typography.base * 1.4,
  },
  requirementText: {
    flex: 1,
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.sm * 1.4,
  },

  // Phase 1 notice
  phase1Notice: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    padding: Spacing[4],
  },
  phase1NoticeText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: Typography.sm * 1.5,
  },

  // CTA
  ctaSection: { gap: Spacing[2] },
});
