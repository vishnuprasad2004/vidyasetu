
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';



export default function RootLayout() {

  return (
    <Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="signup" options={{ headerShown: false }} />
			<Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
