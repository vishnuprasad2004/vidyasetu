import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const BuddyScreen = () => {
  return (
    <SafeAreaView>
      <Text>BuddyScreen</Text>
      <Link href={"/pdf-buddy"}><Text>GO TO THIS PAGE</Text></Link>
    </SafeAreaView>
  )
}

export default BuddyScreen

const styles = StyleSheet.create({})