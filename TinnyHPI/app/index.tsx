import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default function HomeRedirect() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      // only redirect when navigation is mounted
      router.replace('/start');
    }
  }, [navigationState]);

  return null; // optionally render a loading view
}