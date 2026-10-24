import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/src/theme';
import { Button, VazoraLogo } from '@/src/components';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/phone');
  };

  const handleSignIn = () => {
    // Same flow — sign in also goes through phone auth
    router.push('/auth/phone');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Background decorative elements */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        {/* Hero section */}
        <View style={styles.heroSection}>
          <VazoraLogo size="xl" showTagline={false} />

          {/* Tagline */}
          <View style={styles.taglineContainer}>
            <Text style={styles.taglineLine1}>Your car.</Text>
            <Text style={styles.taglineLine2}>Your driver.</Text>
            <Text style={styles.taglineLine3}>Your way.</Text>
          </View>

          {/* Value prop pills */}
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>🚗  Your vehicle</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>✓  Vetted drivers</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>📍  Any trip type</Text>
            </View>
          </View>
        </View>

        {/* CTA section */}
        <View style={styles.ctaSection}>
          {/* Feature highlight cards */}
          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🛡️</Text>
              <Text style={styles.featureLabel}>Background-checked</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>⏱️</Text>
              <Text style={styles.featureLabel}>On-demand or scheduled</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🇮🇳</Text>
              <Text style={styles.featureLabel}>India-first platform</Text>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <Button
              label="Get Started"
              onPress={handleGetStarted}
              variant="primary"
              size="lg"
              fullWidth
            />
            <Button
              label="I already have an account"
              onPress={handleSignIn}
              variant="ghost"
              size="md"
              fullWidth
            />
          </View>

          <Text style={styles.legalText}>
            By continuing, you agree to VAZORA&apos;s{' '}
            <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
            <Text style={styles.legalLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundBase,
  },
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },

  // Decorative background circles
  decorCircle1: {
    position: 'absolute',
    top: -height * 0.1,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primaryMuted,
    opacity: 0.6,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: height * 0.25,
    left: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(245,166,35,0.06)',
  },

  // Hero
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[8],
    gap: Spacing[8],
    paddingTop: Spacing[10],
  },
  taglineContainer: {
    alignItems: 'center',
    gap: 2,
  },
  taglineLine1: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['4xl'],
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingTight,
    lineHeight: Typography['4xl'] * 1.15,
  },
  taglineLine2: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['4xl'],
    color: Colors.primary,
    letterSpacing: Typography.trackingTight,
    lineHeight: Typography['4xl'] * 1.15,
  },
  taglineLine3: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['4xl'],
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingTight,
    lineHeight: Typography['4xl'] * 1.15,
  },

  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  pill: {
    backgroundColor: Colors.backgroundSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing[1] + 2,
    paddingHorizontal: Spacing[3],
  },
  pillText: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    letterSpacing: Typography.trackingWide,
  },

  // CTA
  ctaSection: {
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[8],
    gap: Spacing[5],
  },
  featureRow: {
    flexDirection: 'row',
    gap: Spacing[2],
    justifyContent: 'space-between',
  },
  featureCard: {
    flex: 1,
    backgroundColor: Colors.backgroundSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    padding: Spacing[3],
    alignItems: 'center',
    gap: Spacing[1] + 2,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureLabel: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },

  buttonGroup: {
    gap: Spacing[2],
  },
  legalText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  legalLink: {
    color: Colors.primary,
  },
});
