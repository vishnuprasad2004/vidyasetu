import Button from '@/components/Button'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const WelcomeScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>Vidyasetu</Text>
        <Text style={styles.subtitle}>Your Bridge to a Brighter Future.</Text>
        <Image source={require('@/assets/images/study.svg')}
          style={styles.studyImage}
          contentFit="cover"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => {
              router.push('/login')
            }}
            style={{ width: "50%" }}
            isActive={false}
          />
          <Button
            title='Sign Up'
            onPress={() => {
              router.push("/signup")
            }}
            style={{ width: "50%" }}
            isActive />
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
    paddingHorizontal: 10
  }
})