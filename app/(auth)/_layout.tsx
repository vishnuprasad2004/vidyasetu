
import { Stack } from 'expo-router';
import 'react-native-reanimated';




export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerTitle: "login" }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
