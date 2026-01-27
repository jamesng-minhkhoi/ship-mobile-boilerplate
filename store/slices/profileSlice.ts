/**
 * Profile Slice - User Profile State Management
 */

import { supabase } from '@/utils/supabase';
import { StateCreator } from 'zustand';

export interface Profile {
    id: string;
    email?: string;
    username?: string;
    avatar_url?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ProfileSlice {
    // State
    profile: Profile | null;
    profileLoading: boolean;
    profileError: string | null;

    // Actions
    fetchProfile: (userId: string) => Promise<Profile | null>;
    createProfile: (userId: string, email?: string, metadata?: Partial<Profile>) => Promise<Profile | null>;
    updateProfile: (userId: string, updates: Partial<Profile>) => Promise<Profile | null>;
    setProfile: (profile: Profile | null) => void;
    clearProfile: () => void;
}

export const createProfileSlice: StateCreator<ProfileSlice> = (set, get) => ({
    // Initial state
    profile: null,
    profileLoading: false,
    profileError: null,

    fetchProfile: async (userId: string): Promise<Profile | null> => {
        try {
            set({ profileLoading: true, profileError: null });

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // No profile found
                    set({ profile: null, profileLoading: false });
                    return null;
                }
                throw error;
            }

            set({ profile: data, profileLoading: false });
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
            set({ profileError: errorMessage, profileLoading: false });
            return null;
        }
    },

    createProfile: async (userId: string, email?: string, metadata?: Partial<Profile>): Promise<Profile | null> => {
        try {
            set({ profileLoading: true, profileError: null });

            const profileData = {
                id: userId,
                email,
                ...metadata,
            };

            const { data, error } = await supabase
                .from('profiles')
                .insert(profileData)
                .select()
                .single();

            if (error) throw error;

            set({ profile: data, profileLoading: false });
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create profile';
            set({ profileError: errorMessage, profileLoading: false });
            return null;
        }
    },

    updateProfile: async (userId: string, updates: Partial<Profile>): Promise<Profile | null> => {
        try {
            set({ profileLoading: true, profileError: null });

            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;

            set({ profile: data, profileLoading: false });
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            set({ profileError: errorMessage, profileLoading: false });
            return null;
        }
    },

    setProfile: (profile: Profile | null) => set({ profile }),

    clearProfile: () => set({ profile: null, profileError: null }),
});
