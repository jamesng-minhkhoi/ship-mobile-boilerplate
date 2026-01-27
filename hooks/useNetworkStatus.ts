/**
 * useNetworkStatus Hook
 * Best practices from native-data-fetching skill
 */

import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

/**
 * Hook to monitor network connectivity status
 */
export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);
    const [connectionType, setConnectionType] = useState<string | null>(null);

    useEffect(() => {
        return NetInfo.addEventListener((state) => {
            setIsOnline(state.isConnected ?? true);
            setConnectionType(state.type);
        });
    }, []);

    return { isOnline, connectionType };
}

/**
 * Hook to show offline banner
 */
export function useOfflineNotice() {
    const { isOnline } = useNetworkStatus();
    const [wasOffline, setWasOffline] = useState(false);
    const [showReconnected, setShowReconnected] = useState(false);

    useEffect(() => {
        if (!isOnline) {
            setWasOffline(true);
            setShowReconnected(false);
        } else if (wasOffline && isOnline) {
            setShowReconnected(true);
            // Hide "reconnected" message after 3 seconds
            const timer = setTimeout(() => {
                setShowReconnected(false);
                setWasOffline(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOnline, wasOffline]);

    return {
        isOffline: !isOnline,
        showReconnected
    };
}
