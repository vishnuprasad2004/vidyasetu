import { Image } from "expo-image";
import { Platform, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Image
        source={{
          uri: "https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_0.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfMC5zdmciLCJpYXQiOjE3NTkwODEyMTUsImV4cCI6NDkxMjY4MTIxNX0.27epMioe8AWazDoaQ_yfLo4KJ8Y45V2G5c40F6IbOxs",
        }}
        style={[
          {
            width: Platform.OS === "web" ? 400 : 300,
            height: Platform.OS === "web" ? 400 : 300,
          },
        ]}
        contentFit="contain"
        transition={1000}
      />
      <Image
        source={{
          uri: "https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_0.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfMC5zdmciLCJpYXQiOjE3NTkwODEyMTUsImV4cCI6NDkxMjY4MTIxNX0.27epMioe8AWazDoaQ_yfLo4KJ8Y45V2G5c40F6IbOxs",
        }}
        style={[
          {
            width: Platform.OS === "web" ? 400 : 300,
            height: Platform.OS === "web" ? 400 : 300,
          },
        ]}
        contentFit="contain"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
