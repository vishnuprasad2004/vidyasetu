import { useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomeScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to Vidyasetu</Text>
        <Button
          title="Get Started"
          onPress={() => {
            router.push('/login')
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})