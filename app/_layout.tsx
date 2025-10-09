import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { setUser } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import supabase from '@/lib/supabase';
import { store } from '@/store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const [loaded] = useFonts({
    "Poppins-Italic": require('../assets/fonts/Poppins-Italic.ttf'),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
      }

      if (session) {
        dispatch(setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name,
          avatar_url: session.user.user_metadata?.avatar_url,
        }));
      } else {
        dispatch(setUser(null));
      }
      setIsLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name,
          avatar_url: session.user.user_metadata?.avatar_url,
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  if (!loaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  return (
    <Stack>
      {/* if not logged in */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack.Protected>

      {/* if logged in */}
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
        <Stack.Screen name="pdf-buddy" options={{ headerShown: false }} />
        <Stack.Screen name="quiz-results" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ThemeProvider value={DefaultTheme}>
          <RootLayoutNav />
          <StatusBar style="dark" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
