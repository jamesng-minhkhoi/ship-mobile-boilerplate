/**
 * Secure Token Storage
 * Best practices from native-data-fetching skill
 * Uses expo-secure-store for sensitive data
 */

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// SecureStore only works on native platforms
const isNative = Platform.OS !== "web";

/**
 * Secure token management
 */
export const secureAuth = {
    /**
     * Get the stored auth token
     */
    getToken: async (): Promise<string | null> => {
        if (!isNative) {
            // Fallback to localStorage on web (less secure)
            return localStorage.getItem(TOKEN_KEY);
        }
        return SecureStore.getItemAsync(TOKEN_KEY);
    },

    /**
     * Store the auth token securely
     */
    setToken: async (token: string): Promise<void> => {
        if (!isNative) {
            localStorage.setItem(TOKEN_KEY, token);
            return;
        }
        return SecureStore.setItemAsync(TOKEN_KEY, token);
    },

    /**
     * Remove the auth token
     */
    removeToken: async (): Promise<void> => {
        if (!isNative) {
            localStorage.removeItem(TOKEN_KEY);
            return;
        }
        return SecureStore.deleteItemAsync(TOKEN_KEY);
    },

    /**
     * Get the stored refresh token
     */
    getRefreshToken: async (): Promise<string | null> => {
        if (!isNative) {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        }
        return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    },

    /**
     * Store the refresh token securely
     */
    setRefreshToken: async (token: string): Promise<void> => {
        if (!isNative) {
            localStorage.setItem(REFRESH_TOKEN_KEY, token);
            return;
        }
        return SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
    },

    /**
     * Remove the refresh token
     */
    removeRefreshToken: async (): Promise<void> => {
        if (!isNative) {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return;
        }
        return SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    },

    /**
     * Clear all auth tokens
     */
    clearAll: async (): Promise<void> => {
        await secureAuth.removeToken();
        await secureAuth.removeRefreshToken();
    },
};

/**
 * Authenticated fetch wrapper
 */
export const authFetch = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = await secureAuth.getToken();

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
};
