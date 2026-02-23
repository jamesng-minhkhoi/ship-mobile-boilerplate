# Boilerplate Robustness Review

## Overall assessment

**Current robustness: 6.5/10**

The boilerplate has a strong architectural baseline (Expo Router layout separation, Zustand slices, React Query provider, and a reusable UI layer). It is a good starting point for a production app, but there are reliability gaps that should be closed before shipping.

## What is already solid

1. **Clear app structure and route segmentation** (`(auth)`, `(onboarding)`, `(protected)`) supports scalable navigation and authorization flows.
2. **State management baseline** via Zustand slices with persistence is in place.
3. **Data fetching baseline** via React Query with mobile-friendly defaults (staleTime/retry/window focus behavior).
4. **Error abstraction** with a typed `ApiError` and shared fetch wrapper.
5. **Build/deploy scripts** for EAS are already included.

## Key robustness gaps

### 1) Quality gates are incomplete

- `npm run lint` currently fails with **5 errors + 8 warnings**.
- `npm test` fails because `jest` is not installed/configured while a `test` script exists.

**Impact:** regressions can ship undetected, and CI cannot reliably gate merges.

### 2) Environment configuration is not fail-fast

- Supabase URL/key are cast as strings without runtime validation.
- API client logs a warning if `EXPO_PUBLIC_API_URL` is missing, then still attempts requests.

**Impact:** misconfigured environments can fail at runtime in ways that are harder to diagnose.

### 3) Authentication lifecycle has leak/cleanup risk

- `onAuthStateChange` listener subscription is created in the auth slice setup and not explicitly unsubscribed.

**Impact:** depending on store lifecycle/hot reload behavior, listeners can duplicate and cause subtle state sync issues.

### 4) Placeholder production paths remain

- File upload helper always returns `null` with a TODO warning.
- Apple/Google sign-in methods are currently TODO stubs.

**Impact:** advertised capabilities are partially non-functional out of the box.

## Recommended task backlog

### P0 — Must do before production

1. **Stabilize CI quality gates**
   - Commit and enforce ESLint config.
   - Fix all current lint errors/warnings.
   - Add missing test stack (`jest`, `jest-expo`, basic smoke tests) or remove the test script until implemented.

2. **Add runtime env validation**
   - Validate required env vars at app startup (Supabase URL/key, API base URL where required).
   - Throw actionable errors in development; provide guarded behavior in production.

3. **Auth listener lifecycle hardening**
   - Store and cleanly unsubscribe auth listeners during reinitialization/hot reload.
   - Add a regression test or deterministic integration check for duplicate subscriptions.

### P1 — Strongly recommended

4. **Implement or gate incomplete features**
   - Complete file upload integration with `expo-file-system` or hide this API behind a feature flag.
   - Implement Apple/Google sign-in or mark UI paths as unavailable until configured.

5. **Add network resilience patterns**
   - Add request timeout + cancellation support (`AbortController`).
   - Add retry policy controls by status code (avoid retrying 4xx auth/validation errors).

6. **Observability baseline**
   - Add structured logging + error reporting (e.g., Sentry) in app init/auth/api layers.

### P2 — Maturity improvements

7. **Security and data hardening**
   - Add token/session handling review, secure-store usage checks, and secrets exposure scanning.

8. **Developer experience improvements**
   - Add scripts: `typecheck`, `lint:fix`, `test:watch`, `ci:check`.
   - Add a short "Definition of Done" checklist for new features.

## Suggested implementation order (2 sprints)

- **Sprint 1:** P0 tasks (quality gates + env validation + auth listener cleanup).
- **Sprint 2:** P1 tasks (feature completion/gating + network resilience + observability).

## Success criteria

- CI passes on every PR with `lint`, `typecheck`, and `test`.
- Misconfigured env fails fast with explicit diagnostics.
- No duplicate auth listener events during dev hot reload or app re-mount.
- Placeholder capabilities are either production-ready or clearly feature-flagged.
