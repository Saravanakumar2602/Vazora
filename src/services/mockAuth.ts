/**
 * VAZORA Mock Authentication Service
 *
 * ⚠️  DEVELOPMENT ONLY — Phase 1 stub.
 *
 * This module simulates OTP sending and verification WITHOUT any real SMS
 * gateway or authentication provider. It must be replaced with a real
 * provider (e.g., Zoho Catalyst Auth) before production use.
 *
 * No real OTPs are sent. No credentials are stored. No external calls are made.
 */

import type { ApiResponse, UserProfile, OtpRequest } from '../types';

const MOCK_OTP = '123456'; // clearly labelled dev-only value
const MOCK_DELAY_MS = 1200;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Simulated OTP send — always succeeds after a short delay */
export async function sendOtp(request: OtpRequest): Promise<ApiResponse> {
  await delay(MOCK_DELAY_MS);

  console.log(
    `[MOCK AUTH] OTP "send" called for ${request.countryCode}${request.phone}. ` +
    `DEV OTP is: ${MOCK_OTP}. No real SMS was sent.`
  );

  return { success: true };
}

/** Simulated OTP verify — accepts only the DEV_OTP value */
export async function verifyOtp(
  phone: string,
  otp: string
): Promise<ApiResponse<UserProfile>> {
  await delay(MOCK_DELAY_MS);

  if (otp !== MOCK_OTP) {
    return {
      success: false,
      error: 'Invalid OTP. Please check and try again.',
      code: 'OTP_INVALID',
    };
  }

  const mockUser: UserProfile = {
    id: 'mock-user-001',
    name: 'Guest User',
    phone,
    role: 'customer',
    createdAt: new Date().toISOString(),
  };

  console.log('[MOCK AUTH] OTP verified. Returning mock user profile.');

  return { success: true, data: mockUser };
}

/** Simulated sign-out */
export async function signOut(): Promise<ApiResponse> {
  await delay(300);
  console.log('[MOCK AUTH] User signed out (mock).');
  return { success: true };
}

/** Export the dev OTP hint so screens can display it clearly */
export const DEV_OTP_HINT = MOCK_OTP;
