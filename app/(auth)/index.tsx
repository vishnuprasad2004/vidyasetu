import AnimatedButton from '@/components/AnimatedButton'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const WelcomeScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffd097ee", padding:16 }}>
      <View style={styles.container}>
        <LottieView
          source={require("@/assets/animations/The girl with the flag.json")}
          style={{ width:350, height:350, marginLeft:-100 }}
          autoPlay
          loop
        />
        {/* <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>Vidyasetu</Text> */}
        <Text style={{fontFamily:"Poppins-Bold", fontSize:48, lineHeight:52 }}>Welcome to Vidyasetu</Text>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:20, color:"#444"}}>Your Bridge to a Brighter Future.</Text>
        {/* <Text style={styles.subtitle}>Your Bridge to a Brighter Future.</Text> */}
        <View style={styles.buttonContainer}>
            <AnimatedButton
              onPress={() => router.push("/(auth)/signup")}
              title='Get Started'
              width={"100%"}
            />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    height:"100%"
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: "Poppins-Bold"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#6f72df",
    fontFamily: "Poppins-Medium"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "grey",
    fontFamily: "Poppins-Medium"
  },
  studyImage: {
    width: 400,
    height: 400,
    marginBottom: 30
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    // paddingHorizontal: 10,
    position:"absolute",
    bottom:12
  }
})