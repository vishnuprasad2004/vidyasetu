import { useAppSelector } from '@/hooks/redux';
import { SplashScreen } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function SplashScreenController() {
    const authLoading = useAppSelector((state) => state.auth.isLoggedIn);
    if (authLoading) {
        SplashScreen.hideAsync();
    }

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }} >
        <ActivityIndicator size="large" color="#0a7ea4" />
    </View>;
}
