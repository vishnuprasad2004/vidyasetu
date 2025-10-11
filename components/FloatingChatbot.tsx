import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
const FloatingChatbot = () => {
    const router = useRouter();
    const handlePress = () => {
        router.push("/ai-bot")
    };

    return (

        <View style={[styles.floatingContainer]}>
            <TouchableOpacity onPress={handlePress}>
                <LottieView
                    autoPlay
                    loop
                    source={require('@/assets/animations/guru.json')}
                    style={{ width: 100, height: 100 }}
                />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    floatingContainer: {
        position: "absolute",
        right: 0,
        bottom: 20,
        zIndex: 100,
    },
    button: {
        backgroundColor: "#edeee8ff",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
});

export default FloatingChatbot;
