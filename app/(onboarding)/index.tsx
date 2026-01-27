/**
 * Onboarding Index - Redirect to welcome
 */

import { Redirect } from "expo-router";

export default function OnboardingIndex() {
    return <Redirect href="/(onboarding)/welcome" />;
}
