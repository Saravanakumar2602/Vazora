import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/src/theme';
import { VazoraLogo } from '@/src/components';
import type { TripOption } from '@/src/types';

const TRIP_OPTIONS: TripOption[] = [
  {
    id: 'local',
    label: 'Local Trip',
    description: 'Within city — quick errands, appointments',
    icon: '🏙️',
    estimatedDuration: 'Up to 4 hrs',
  },
  {
    id: 'half-day',
    label: 'Half Day',
    description: 'Flexible 4-hour block for your schedule',
    icon: '🌤️',
    estimatedDuration: '4 hours',
  },
  {
    id: 'full-day',
    label: 'Full Day',
    description: 'All-day driver — 8 hours, city or short distances',
    icon: '☀️',
    estimatedDuration: '8 hours',
  },
  {
    id: 'outstation',
    label: 'Outstation',
    description: 'Inter-city travel with professional chauffeur',
    icon: '🛣️',
    estimatedDuration: 'Multi-day',
  },
];

// Placeholder data
const PLACEHOLDER_USER_NAME = 'there';
const PLACEHOLDER_PICKUP = {
  label: 'Home',
  address: '14, Brigade Road, Bengaluru',
};

export default function CustomerHomeScreen() {
  const router = useRouter();

  const handleTripSelect = (_tripType: string) => {
    // Phase 1 — navigation placeholder
    // Future: navigate to booking details screen
    console.log(`[HOME] Trip type selected: ${_tripType} — booking not implemented in Phase 1.`);
  };

  const handleChangePickup = () => {
    console.log('[HOME] Change pickup — not implemented in Phase 1.');
  };

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {greeting}, {PLACEHOLDER_USER_NAME} 👋
            </Text>
            <Text style={styles.headerSubtitle}>Where do you need a driver today?</Text>
          </View>
          <VazoraLogo size="sm" />
        </View>

        {/* Pickup Location Card */}
        <View style={[styles.pickupCard, Shadows.md]}>
          <View style={styles.pickupCardTop}>
            <View style={styles.locationDot} />
            <View style={styles.pickupInfo}>
              <Text style={styles.pickupLabel}>Pickup from</Text>
              <Text style={styles.pickupAddress} numberOfLines={1}>
                {PLACEHOLDER_PICKUP.label} — {PLACEHOLDER_PICKUP.address}
              </Text>
            </View>
          </View>
          <View style={styles.pickupDivider} />
          <TouchableOpacity
            style={styles.changePickupRow}
            onPress={handleChangePickup}
            accessibilityRole="button"
            accessibilityLabel="Change pickup address"
          >
            <Text style={styles.changePickupIcon}>📍</Text>
            <Text style={styles.changePickupText}>Choose a different pickup address</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Book a Driver</Text>
          <Text style={styles.sectionSubtitle}>
            Choose the trip type that fits your plans.
          </Text>

          <View style={styles.tripGrid}>
            {TRIP_OPTIONS.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                onPress={() => handleTripSelect(trip.id)}
                activeOpacity={0.78}
                accessibilityRole="button"
                accessibilityLabel={`Book ${trip.label}`}
              >
                <View style={styles.tripIconWrapper}>
                  <Text style={styles.tripIcon}>{trip.icon}</Text>
                </View>
                <View style={styles.tripInfo}>
                  <Text style={styles.tripLabel}>{trip.label}</Text>
                  <Text style={styles.tripDesc} numberOfLines={2}>
                    {trip.description}
                  </Text>
                  <View style={styles.durationTag}>
                    <Text style={styles.durationText}>⏱ {trip.estimatedDuration}</Text>
                  </View>
                </View>
                <Text style={styles.tripArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Favourite Drivers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Drivers</Text>
          {/* Empty state */}
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>⭐</Text>
            <Text style={styles.emptyStateTitle}>No favourites yet</Text>
            <Text style={styles.emptyStateText}>
              After your first trip, you can add drivers to your favourites for quick re-booking.
            </Text>
          </View>
        </View>

        {/* Phase 1 Note */}
        {__DEV__ && (
          <View style={styles.devNote}>
            <Text style={styles.devNoteText}>
              🛠 Phase 1 — Booking submission, real driver matching and payments are not implemented yet.
            </Text>
          </View>
        )}
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
    gap: Spacing[6],
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontFamily: Typography.fontFamilyBold,
    fontSize: Typography['2xl'],
    color: Colors.textPrimary,
    letterSpacing: Typography.trackingTight,
  },
  headerSubtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing[1],
  },

  // Pickup Card
  pickupCard: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  pickupCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    padding: Spacing[4],
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
  },
  pickupInfo: { flex: 1 },
  pickupLabel: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: Typography.trackingWide,
    marginBottom: 2,
  },
  pickupAddress: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  pickupDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing[4],
  },
  changePickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[4],
  },
  changePickupIcon: { fontSize: 16 },
  changePickupText: {
    flex: 1,
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.sm,
    color: Colors.primary,
  },
  chevron: {
    fontSize: 20,
    color: Colors.textTertiary,
  },

  // Section
  section: { gap: Spacing[3] },
  sectionTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.xl,
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: -Spacing[2],
  },

  // Trip cards
  tripGrid: { gap: Spacing[3] },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing[4],
    gap: Spacing[4],
  },
  tripIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripIcon: { fontSize: 24 },
  tripInfo: { flex: 1, gap: Spacing[1] },
  tripLabel: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  tripDesc: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.sm * 1.4,
  },
  durationTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accentMuted,
    borderRadius: BorderRadius.full,
    paddingVertical: 2,
    paddingHorizontal: Spacing[2],
    marginTop: Spacing[1],
  },
  durationText: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: Typography.xs,
    color: Colors.accent,
  },
  tripArrow: {
    fontSize: 22,
    color: Colors.textTertiary,
  },

  // Empty state
  emptyState: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    padding: Spacing[8],
    alignItems: 'center',
    gap: Spacing[2],
  },
  emptyStateIcon: { fontSize: 32 },
  emptyStateTitle: {
    fontFamily: Typography.fontFamilySemiBold,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  emptyStateText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.sm * 1.5,
  },

  // Dev note
  devNote: {
    backgroundColor: Colors.backgroundSurface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing[3],
  },
  devNoteText: {
    fontFamily: Typography.fontFamilyRegular,
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
