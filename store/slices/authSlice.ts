/**
 * Auth Slice - Authentication State Management
 */

import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { StateCreator } from 'zustand';

type AuthError = { error: string | null };
type AuthResult = { session: Session | null; error: string | null };

export interface AuthSlice {
    // State
    session: Session | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    signInWithEmail: (email: string, password: string) => Promise<AuthResult>;
    signUpWithEmail: (email: string, password: string, username: string) => Promise<AuthResult>;
    signInWithApple: () => Promise<Session | null>;
    signInWithGoogle: () => Promise<Session | null>;
    signOut: () => Promise<void>;
    initializeAuth: () => Promise<void>;
    resetPasswordWithOTP: (email: string) => Promise<AuthError>;
    setSession: (session: Session | null) => void;
    resetAuthState: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => {
    // Set up auth state listener
    const setupAuthListener = () => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, !!session);
            set({ session });
        });
    };

    // Initialize listener
    setupAuthListener();

    return {
        // Initial state
        session: null,
        isLoading: false,
        error: null,

        signInWithEmail: async (email: string, password: string): Promise<AuthResult> => {
            try {
                set({ isLoading: true, error: null });

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password.trim(),
                });

                if (error) {
                    set({ isLoading: false });
                    return { session: null, error: error.message };
                }

                set({ isLoading: false });
                return { session: data.session, error: null };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
                set({ error: errorMessage, isLoading: false });
                return { session: null, error: errorMessage };
            }
        },

        signUpWithEmail: async (email: string, password: string, username: string): Promise<AuthResult> => {
            try {
                set({ isLoading: true, error: null });

                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { username },
                    },
                });

                if (error) {
                    set({ isLoading: false });
                    return { session: null, error: error.message };
                }

                set({ isLoading: false });
                return { session: data.session, error: null };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
                set({ error: errorMessage, isLoading: false });
                return { session: null, error: errorMessage };
            }
        },

        signInWithApple: async (): Promise<Session | null> => {
            // TODO: Implement Apple Sign-In
            // Requires: expo-apple-authentication
            console.log("Apple Sign-In not yet implemented");
            return null;
        },

        signInWithGoogle: async (): Promise<Session | null> => {
            // TODO: Implement Google Sign-In
            // Requires: @react-native-google-signin/google-signin
            console.log("Google Sign-In not yet implemented");
            return null;
        },

        signOut: async (): Promise<void> => {
            try {
                set({ isLoading: true, error: null });
                await supabase.auth.signOut({ scope: 'global' });
                get().resetAuthState();
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to sign out";
                set({ error: errorMessage, isLoading: false });
                throw error;
            }
        },

        initializeAuth: async (): Promise<void> => {
            try {
                set({ isLoading: true });
                const { data: { session } } = await supabase.auth.getSession();
                set({ session, isLoading: false });
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to initialize auth',
                    isLoading: false
                });
            }
        },

        resetPasswordWithOTP: async (email: string): Promise<AuthError> => {
            try {
                set({ isLoading: true, error: null });
                const { error } = await supabase.auth.resetPasswordForEmail(email);

                if (error) {
                    set({ error: error.message, isLoading: false });
                    return { error: error.message };
                }

                set({ isLoading: false });
                return { error: null };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to send OTP";
                set({ error: errorMessage, isLoading: false });
                return { error: errorMessage };
            }
        },

        setSession: (session: Session | null) => set({ session }),

        resetAuthState: () => set({
            session: null,
            isLoading: false,
            error: null,
        }),
    };
};
