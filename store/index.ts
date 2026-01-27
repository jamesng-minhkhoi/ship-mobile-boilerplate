/**
 * Zustand Store - Combined Store with Persist Middleware
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { OnboardingSlice, createOnboardingSlice } from './slices/onboardingSlice';
import { ProfileSlice, createProfileSlice } from './slices/profileSlice';

interface StoreState extends AuthSlice, OnboardingSlice, ProfileSlice { }

const useStore = create<StoreState>()(
    persist(
        (...a) => ({
            ...createAuthSlice(...a),
            ...createOnboardingSlice(...a),
            ...createProfileSlice(...a),
        }),
        {
            name: 'app-store',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                // Persist only necessary state
                hasCompletedOnboarding: state.hasCompletedOnboarding,
                surveyData: state.surveyData,
                profile: state.profile,
                // Don't persist session - Supabase handles this
                // Don't persist loading/error states
            }),
        }
    )
);

// Re-export slice types
export type { AuthSlice } from './slices/authSlice';
export type { OnboardingSlice, OnboardingSurvey } from './slices/onboardingSlice';
export type { Profile, ProfileSlice } from './slices/profileSlice';

export default useStore;
