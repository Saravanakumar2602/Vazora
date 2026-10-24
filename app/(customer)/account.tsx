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
import { VazoraLogo } from '@/src/components';

interface AccountOptionProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  accent?: boolean;
  badge?: string;
}

function AccountOption({
  icon,
  title,
  subtitle,
  onPress,
  accent = false,
  badge,
}: AccountOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.optionCard, accent && styles.optionCardAccent]}
      onPress={onPress}
      activeOpacity={0.78}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={[styles.optionIconWrapper, accent && styles.optionIconWrapperAccent]}>
        <Text style={styles.optionIcon}>{icon}</Text>
      </View>
      <View style={styles.optionText}>
        <View style={styles.optionTitleRow}>
          <Text style={[styles.optionTitle, accent && styles.optionTitleAccent]}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.optionSubtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>
      <Text style={styles.optionChevron}>›</Text>
    </TouchableOpacity>
  );
}

export default function AccountScreen() {
  const router = useRouter();

  const handleProfile = () => {
    console.log('[ACCOUNT] Profile — not implemented in Phase 1.');
  };

  const handleBecomeDriver = () => {
    router.push('/(driver)/apply');
  };

  const handleTripHistory = () => {
    console.log('[ACCOUNT] Trip history — not implemented in Phase 1.');
  };

  const handleSupport = () => {
    console.log('[ACCOUNT] Support — not implemented in Phase 1.');
  };

  const handleSignOut = () => {
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <VazoraLogo size="sm" />
          <Text style={styles.screenTitle}>Account</Text>
        </View>

        {/* Profile card */}
        <View style={[styles.profileCard, Shadows.md]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>G</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <Text style={styles.profilePhone}>Customer Account</Text>
            <View style={styles.customerBadge}>
              <Text style={styles.customerBadgeText}>🚗  Customer Mode</Text>
            </View>
          </View>
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>My Account</Text>
          <View style={styles.optionList}>
            <AccountOption
              icon="👤"
              title="Edit Profile"
              subtitle="Update your name, email and profile photo"
              onPress={handleProfile}
            />
            <AccountOption
              icon="📋"
              title="Trip History"
              subtitle="View your past bookings and receipts"
              onPress={handleTripHistory}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Earn with VAZORA</Text>
          <AccountOption
            icon="🚗"
            title="Become a Driver"
            subtitle="Apply to drive for VAZORA customers using their own vehicles. Submit documents for admin review."
            onPress={handleBecomeDriver}
            accent
            badge="Apply now"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Support</Text>
          <View style={styles.optionList}>
            <AccountOption
              icon="💬"
              title="Help & Support"
              subtitle="Get help with bookings, payments and more"
              onPress={handleSupport}
            />
          </View>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>VAZORA v1.0.0 — Phase 1 Preview</Text>
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
    paddingTop: Spacing[5],
    paddingBottom: Spacing[10],
    gap: Spacing[5],
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['2xl'],
    color: Colors.textPrimary,
  },

  // Profile card
  profileCard: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryMuted,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['2xl'],
    color: Colors.primary,
  },
  profileInfo: { flex: 1, gap: Spacing[1] },
  profileName: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.lg,
    color: Colors.textPrimary,
  },
  profilePhone: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  customerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryMuted,
    borderRadius: BorderRadius.full,
    paddingVertical: 2,
    paddingHorizontal: Spacing[2],
    marginTop: Spacing[1],
  },
  customerBadgeText: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.primary,
  },

  // Sections
  section: { gap: Spacing[3] },
  sectionLabel: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: Typography.trackingWide,
  },
  optionList: { gap: Spacing[2] },

  // Option card
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing[4],
    gap: Spacing[4],
  },
  optionCardAccent: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryMuted,
  },
  optionIconWrapper: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.backgroundOverlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconWrapperAccent: {
    backgroundColor: Colors.primary,
  },
  optionIcon: { fontSize: 22 },
  optionText: { flex: 1, gap: 2 },
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    flexWrap: 'wrap',
  },
  optionTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  optionTitleAccent: { color: Colors.primaryLight },
  optionSubtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.sm * 1.4,
  },
  optionChevron: {
    fontSize: 22,
    color: Colors.textTertiary,
  },

  // Badge
  badge: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    paddingVertical: 2,
    paddingHorizontal: Spacing[2],
  },
  badgeText: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textInverse,
  },

  // Sign out
  signOutButton: {
    alignItems: 'center',
    paddingVertical: Spacing[4],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.error,
    backgroundColor: Colors.errorMuted,
  },
  signOutText: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.error,
  },

  version: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing[2],
  },
});
