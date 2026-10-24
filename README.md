# VAZORA — Mobile App

> **Your car. Your driver. Your way.**

VAZORA is a platform where customers book professional, background-checked drivers to drive the customer's **own vehicle**. VAZORA does not provide vehicles.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native 0.76 |
| Framework | Expo SDK 52 |
| Language | TypeScript 5.3 |
| Navigation | Expo Router 4 (file-based) |
| Fonts | Inter (via `@expo-google-fonts/inter`) |
| Backend (future) | Zoho Catalyst |
| Admin Dashboard (future) | Next.js |

---

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or Yarn 1.x)
- **Expo CLI** — install globally: `npm install -g expo-cli`
- **Expo Go** app on your Android device (for quick preview)

---

## Installation

```bash
# Clone or open the project directory
cd "c:\Saravanakumar G\Projects\Vazora"

# Install dependencies
npm install

# (Optional) Install Expo CLI globally if not already
npm install -g expo-cli
```

---

## Running the App

### Start the Expo development server
```bash
npm start
# or
npx expo start
```

### Run on Android (device or emulator)
```bash
npm run android
# or
npx expo start --android
```

### Run via Expo Go (recommended for quick preview)
1. Install **Expo Go** from the Google Play Store.
2. Run `npm start`.
3. Scan the QR code shown in the terminal with Expo Go.

### Run on web (limited — for layout checking only)
```bash
npm run web
```

---

## TypeScript Check
```bash
npm run typescript
# or
npx tsc --noEmit
```

## Lint
```bash
npm run lint
```

---

## Implemented Screens (Phase 1)

| Screen | Route | Description |
|---|---|---|
| Welcome | `/welcome` | Brand intro, tagline, Get Started / Sign In |
| Phone Number | `/auth/phone` | Country code selector, phone input, validation |
| OTP Verification | `/auth/otp` | 6-digit OTP with mock verification, resend countdown |
| Customer Home | `/(customer)/home` | Greeting, pickup card, trip type selection, favourite drivers |
| Account | `/(customer)/account` | Profile, mode switch, Become a Driver entry |
| Driver Apply | `/(driver)/apply` | Driver onboarding info, requirements, approval process |

---

## Demo Flow

```
App Launch
    → Welcome Screen
        → Get Started
            → Phone Number (enter any number, e.g. 9876543210)
                → Continue
                    → OTP Screen (use DEV OTP: 123456)
                        → Verify
                            → Customer Home (tab navigation)
                                → Account tab
                                    → Become a Driver
                                        → Driver Apply Screen
```

> **DEV OTP:** `123456` — No real SMS is sent. This is a mock flow clearly labelled in the UI.

---

## Project Structure

```
Vazora/
├── app/                        # Expo Router screens (file-based routes)
│   ├── _layout.tsx             # Root layout (fonts, navigation stack)
│   ├── index.tsx               # Entry → redirects to /welcome
│   ├── welcome.tsx             # Welcome screen
│   ├── auth/
│   │   ├── phone.tsx           # Phone number entry
│   │   └── otp.tsx             # OTP verification
│   ├── (customer)/
│   │   ├── _layout.tsx         # Customer tab bar layout
│   │   ├── home.tsx            # Customer home
│   │   └── account.tsx         # Account / mode selection
│   └── (driver)/
│       ├── _layout.tsx         # Driver stack layout
│       └── apply.tsx           # Driver application placeholder
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   ├── Card.tsx
│   │   ├── VazoraLogo.tsx
│   │   ├── DevModeBanner.tsx
│   │   └── index.ts
│   ├── theme/                  # Design tokens (colors, typography, spacing)
│   │   ├── tokens.ts
│   │   └── index.ts
│   ├── types/                  # TypeScript domain types
│   │   └── index.ts
│   └── services/               # API/service layer
│       ├── mockAuth.ts         # DEV ONLY — mock OTP flow
│       └── index.ts
├── assets/
│   └── images/                 # App icons and splash (replace with real assets)
├── app.json                    # Expo app configuration
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── package.json
```

---

## Design System

The entire visual identity is defined in [`src/theme/tokens.ts`](./src/theme/tokens.ts).

| Token group | Description |
|---|---|
| `Colors` | Brand primaries (indigo-violet), accent (amber), semantic, backgrounds, text, borders |
| `Typography` | Inter font family, font sizes, line heights, letter spacing |
| `Spacing` | 4px grid-based spacing scale |
| `BorderRadius` | Consistent radius scale (sm → 2xl → full) |
| `Shadows` | Layered shadows with brand colour variants |

---

## Known Limitations (Phase 1)

- **No real authentication** — OTP is mocked. DEV OTP is `123456`.
- **No real SMS delivery** — `sendOtp()` is a mock that logs to console only.
- **No backend** — Zoho Catalyst integration is Phase 2.
- **No booking submission** — Trip selection navigates but does not create a booking.
- **No driver document upload** — Driver apply screen is a placeholder.
- **No real-time data** — All data (pickup address, profile name) is static placeholder.
- **No push notifications** — Not implemented in Phase 1.
- **Assets are placeholders** — Replace `assets/images/` with production PNG assets.
- **iOS not primary target** — Designed and tested for Android. iOS layout may need minor adjustments.

---

## Next Milestone — Phase 2

1. **Zoho Catalyst Auth** — Replace mock OTP with real phone authentication.
2. **User profile storage** — Store and fetch user profile from Catalyst Data Store.
3. **Address input** — Integrate Google Maps Places API for address autocomplete.
4. **Booking creation** — Implement booking draft → confirmation flow.
5. **Driver document upload** — File upload to Catalyst File Store.
6. **Admin dashboard** — Next.js app for driver approval and booking management.

---

## Security Notes

- No API keys, credentials or production secrets are present in this codebase.
- Mock auth is clearly labelled and gated behind `__DEV__`.
- Do not commit `.env` files to version control.
- Replace mock services before any production deployment.

---

*VAZORA Phase 1 — Mobile Foundation. Built with Expo SDK 52 + React Native 0.76.*
