/**
 * VAZORA Shared TypeScript Types
 * Phase 1 — Core domain types for the mobile app foundation.
 */

// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'driver' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  email?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  /** DEV ONLY: mock mode bypasses real SMS/OTP */
  isMockMode: boolean;
}

// ─── Phone / OTP ─────────────────────────────────────────────────────────────

export interface CountryCode {
  name: string;
  code: string;    // ISO 3166-1 alpha-2 e.g. "IN"
  dialCode: string; // e.g. "+91"
  flag: string;    // Emoji flag
}

export interface OtpRequest {
  phone: string;
  countryCode: string;
}

// ─── Location ────────────────────────────────────────────────────────────────

export interface Location {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface SavedAddress extends Location {
  type: 'home' | 'work' | 'other';
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type TripType = 'local' | 'half-day' | 'full-day' | 'outstation';

export interface TripOption {
  id: TripType;
  label: string;
  description: string;
  icon: string;        // Icon name for rendering
  estimatedDuration: string;
  basePrice?: number;  // Not used in Phase 1 — placeholder
}

export interface BookingDraft {
  tripType: TripType | null;
  pickupAddress: SavedAddress | null;
  scheduledAt?: Date;
}

// ─── Driver ──────────────────────────────────────────────────────────────────

export type DriverApplicationStatus =
  | 'not_started'
  | 'pending_documents'
  | 'under_review'
  | 'approved'
  | 'rejected';

export interface DriverProfile {
  id: string;
  userId: string;
  licenseNumber?: string;
  applicationStatus: DriverApplicationStatus;
  rating?: number;
  totalTrips?: number;
  vehicleTypes?: string[];
}

export interface FavouriteDriver {
  driverId: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  totalTrips: number;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type RootRoute =
  | '/'
  | '/welcome'
  | '/auth/phone'
  | '/auth/otp'
  | '/(customer)/home'
  | '/(customer)/account'
  | '/(driver)/apply';

// ─── API / Service Layer (Phase 1 stubs) ────────────────────────────────────

export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface ServiceConfig {
  baseUrl: string;
  timeout: number;
  /** Injected per request */
  authToken?: string;
}
