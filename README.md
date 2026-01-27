# Ship Mobile Boilerplate 🚀

A production-ready React Native / Expo boilerplate designed to help you ship mobile apps in 1 day or less.

## Features

- 🎨 **Complete Design System** - Color, typography, spacing, shadow, and size tokens
- 🧩 **UI Components** - AppButton, AppText, AppCard, AppInput, AppAvatar, AppBadge, AppToggle
- 🔐 **Authentication** - Email/password with Supabase (Apple/Google Sign-In ready)
- 📱 **Navigation** - Expo Router v6 with protected routes and tabs
- 💾 **State Management** - Zustand with persist middleware and slice pattern
- 💰 **Monetization** - RevenueCat paywall integration ready
- 🌍 **Internationalization** - i18next ready structure
- 📦 **Build Ready** - EAS Build configuration included

## AI Agent Skills

This boilerplate includes official [Expo Skills](https://github.com/expo/skills) for AI-assisted development:

| Skill | Description |
|-------|-------------|
| `building-native-ui` | Building beautiful apps with Expo Router |
| `expo-api-routes` | Creating API routes with EAS Hosting |
| `expo-dev-client` | Building and distributing dev clients |
| `expo-tailwind-setup` | Setting up Tailwind CSS v4 |
| `native-data-fetching` | Implementing API calls and data fetching |
| `use-dom` | Using Expo DOM components |
| `expo-cicd-workflows` | EAS workflow YAML files |
| `expo-deployment` | Deploying to App Store and Play Store |
| `upgrading-expo` | Upgrading Expo SDK versions |

Skills are auto-discovered by agents (Cursor, Continue, Gemini CLI, etc.) when you ask Expo-related questions.

## Quick Start

### 1. Clone or copy this boilerplate

```bash
cd /path/to/ship-mobile-boilerplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 4. Start development

```bash
npx expo start
```

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── (auth)/            # Auth screens (sign-in, sign-up)
│   ├── (onboarding)/      # Onboarding screens
│   ├── (protected)/       # Authenticated routes
│   │   ├── (tabs)/        # Tab navigation (home, explore, profile)
│   │   └── (settings)/    # Settings screens
│   ├── paywall.tsx        # RevenueCat paywall
│   └── _layout.tsx        # Root layout with guards
├── components/
│   └── ui/                # Design system components
├── constants/             # Design tokens
├── hooks/                 # Custom hooks
├── store/                 # Zustand store
│   └── slices/           # State slices
├── utils/                 # Utilities (Supabase, etc.)
└── types/                 # TypeScript types
```

## Design System

### Colors
```typescript
import { designTokens, themeColors } from '@/constants/colors';

// Use tokens
designTokens.primary.blue[500]
designTokens.secondary.green[600]

// Use theme colors
const theme = useThemeColor();
theme.textPrimary
theme.tint
```

### Typography
```tsx
<AppText type="headlineLarge" weight="bold">Title</AppText>
<AppText type="bodyMedium" color="secondary">Subtitle</AppText>
```

### Components
```tsx
<AppButton color="primary" size="large" block>
  Submit
</AppButton>

<AppCard shadow="md" padding="lg">
  <AppText>Content</AppText>
</AppCard>

<AppInputField
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
/>
```

## State Management

```typescript
import useStore from '@/store';

// In component
const { session, signInWithEmail, profile } = useStore();
```

## Customization Checklist

- [ ] Update `app.json` with your app name and bundle IDs
- [ ] Add your Supabase credentials to `.env`
- [ ] Replace placeholder icons in `assets/images/`
- [ ] Customize colors in `constants/colors.ts`
- [ ] Add your custom fonts in `assets/fonts/`
- [ ] Update onboarding content in `app/(onboarding)/`
- [ ] Configure RevenueCat API keys for monetization

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for iOS
eas build -p ios

# Build for Android
eas build -p android
```

## License

MIT
