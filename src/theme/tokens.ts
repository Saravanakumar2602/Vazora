/**
 * VAZORA Design Tokens
 * Central source of truth for all visual design decisions.
 * Change values here to retheme the entire app.
 */

export const Colors = {
  // Brand primaries — deep navy-to-violet
  primary: '#5B4FE8',       // Vibrant indigo-violet
  primaryDark: '#3D33C8',   // Deeper press state
  primaryLight: '#7B72EF',  // Lighter tint
  primaryMuted: 'rgba(91, 79, 232, 0.12)', // Subtle background

  // Accent — warm amber for CTAs and highlights
  accent: '#F5A623',
  accentDark: '#D4890D',
  accentLight: '#FAC560',
  accentMuted: 'rgba(245, 166, 35, 0.12)',

  // Semantic
  success: '#22C55E',
  successMuted: 'rgba(34, 197, 94, 0.12)',
  warning: '#F59E0B',
  warningMuted: 'rgba(245, 158, 11, 0.12)',
  error: '#EF4444',
  errorMuted: 'rgba(239, 68, 68, 0.12)',
  info: '#3B82F6',
  infoMuted: 'rgba(59, 130, 246, 0.12)',

  // Background layers (dark mode first)
  backgroundBase: '#0A0A14',      // Deepest background
  backgroundSurface: '#12121E',   // Cards, sheets
  backgroundElevated: '#1A1A2E',  // Elevated cards
  backgroundOverlay: '#22223A',   // Modal overlays, hover states

  // Text
  textPrimary: '#F0F0FF',
  textSecondary: '#9999BB',
  textTertiary: '#5A5A7A',
  textInverse: '#0A0A14',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#0A0A14',

  // Borders & dividers
  border: 'rgba(255, 255, 255, 0.08)',
  borderFocused: '#5B4FE8',
  divider: 'rgba(255, 255, 255, 0.05)',

  // Input fields
  inputBackground: 'rgba(255, 255, 255, 0.05)',
  inputBorder: 'rgba(255, 255, 255, 0.12)',

  // White / Black utilities
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const Typography = {
  // Font families — loaded via Google Fonts (Inter)
  fontFamilyRegular: 'Inter_400Regular',
  fontFamilyMedium: 'Inter_500Medium',
  fontFamilySemiBold: 'Inter_600SemiBold',
  fontFamilyBold: 'Inter_700Bold',
  fontFamilyExtraBold: 'Inter_800ExtraBold',

  // Font sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
  '5xl': 40,
  '6xl': 48,

  // Line heights (multipliers)
  lineHeightTight: 1.2,
  lineHeightSnug: 1.35,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.65,

  // Letter spacing
  trackingTight: -0.5,
  trackingNormal: 0,
  trackingWide: 0.4,
  trackingWidest: 1.2,
} as const;

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  '2xl': 28,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  primary: {
    shadowColor: '#5B4FE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  accent: {
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
} as const;

export const Theme = {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} as const;

export type ThemeType = typeof Theme;
