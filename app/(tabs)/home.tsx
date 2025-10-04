
import { Button, StyleSheet, Text, ToastAndroid, View } from "react-native";

import Header from "@/components/Header";
import { useAppSelector } from "@/hooks/redux";
import supabase from "@/lib/supabase";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  return (
    <SafeAreaView>

      <Header />
      <View style={{ padding: 20 }}>
        <Text>
          {JSON.stringify(user, null, 2)}
        </Text>
        <Button title="Logout" onPress={() => {
          supabase.auth.signOut();
          ToastAndroid.show('Logout successful', ToastAndroid.LONG);
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userProfileIcon: {
    width: 50,
    height: 50,
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 150,
    overflow: 'hidden',
    backgroundColor: "lightblue",
  }
});
