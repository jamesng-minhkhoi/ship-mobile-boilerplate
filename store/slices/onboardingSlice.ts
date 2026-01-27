/**
 * Onboarding Slice - Onboarding State Management
 */

import { StateCreator } from 'zustand';

export interface OnboardingSurvey {
    selectedOption?: string;
    additionalData?: Record<string, any>;
}

export interface OnboardingSlice {
    // State
    hasCompletedOnboarding: boolean;
    currentStep: number;
    surveyData: OnboardingSurvey;

    // Actions
    setOnboardingComplete: (complete: boolean) => void;
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;
    setSurveyData: (data: Partial<OnboardingSurvey>) => void;
    resetOnboarding: () => void;
}

export const createOnboardingSlice: StateCreator<OnboardingSlice> = (set, get) => ({
    // Initial state
    hasCompletedOnboarding: false,
    currentStep: 0,
    surveyData: {},

    setOnboardingComplete: (complete: boolean) =>
        set({ hasCompletedOnboarding: complete }),

    setCurrentStep: (step: number) =>
        set({ currentStep: step }),

    nextStep: () =>
        set((state) => ({ currentStep: state.currentStep + 1 })),

    previousStep: () =>
        set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

    setSurveyData: (data: Partial<OnboardingSurvey>) =>
        set((state) => ({
            surveyData: { ...state.surveyData, ...data },
        })),

    resetOnboarding: () =>
        set({
            hasCompletedOnboarding: false,
            currentStep: 0,
            surveyData: {},
        }),
});
