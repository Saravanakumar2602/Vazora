import { Redirect } from 'expo-router';

/**
 * Entry point — immediately redirects to the Welcome screen.
 * Future: Check auth state and redirect to home if already signed in.
 */
export default function Index() {
  return <Redirect href="/welcome" />;
}
