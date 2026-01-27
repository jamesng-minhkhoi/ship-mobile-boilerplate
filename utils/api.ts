/**
 * API Client
 * Best practices from native-data-fetching skill
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Custom API error class for typed error handling
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Fetch with proper error handling
 */
export const fetchWithErrorHandling = async <T>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new ApiError(
                error.message || "Request failed",
                response.status,
                error.code
            );
        }

        return response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Network error (no internet, timeout, etc.)
        throw new ApiError("Network error", 0, "NETWORK_ERROR");
    }
};

/**
 * Fetch with retry and exponential backoff
 */
export const fetchWithRetry = async <T>(
    url: string,
    options?: RequestInit,
    retries = 3
): Promise<T> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetchWithErrorHandling<T>(url, options);
        } catch (error) {
            if (i === retries - 1) throw error;
            // Exponential backoff
            await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
        }
    }
    throw new ApiError("Max retries exceeded", 0, "MAX_RETRIES");
};

/**
 * API client with base URL
 */
export const apiClient = {
    get: async <T>(path: string): Promise<T> => {
        if (!BASE_URL) {
            console.warn("EXPO_PUBLIC_API_URL is not defined");
        }
        return fetchWithErrorHandling<T>(`${BASE_URL || ''}${path}`);
    },

    post: async <T>(path: string, body: unknown): Promise<T> => {
        if (!BASE_URL) {
            console.warn("EXPO_PUBLIC_API_URL is not defined");
        }
        return fetchWithErrorHandling<T>(`${BASE_URL || ''}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    },

    put: async <T>(path: string, body: unknown): Promise<T> => {
        if (!BASE_URL) {
            console.warn("EXPO_PUBLIC_API_URL is not defined");
        }
        return fetchWithErrorHandling<T>(`${BASE_URL || ''}${path}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    },

    delete: async <T>(path: string): Promise<T> => {
        if (!BASE_URL) {
            console.warn("EXPO_PUBLIC_API_URL is not defined");
        }
        return fetchWithErrorHandling<T>(`${BASE_URL || ''}${path}`, {
            method: "DELETE",
        });
    },
};
