
import { Platform, StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/Header";

export default function HomeScreen() {
  return (
    <SafeAreaView>

      <Header/>
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
    backgroundColor:"lightblue",
  }
});
