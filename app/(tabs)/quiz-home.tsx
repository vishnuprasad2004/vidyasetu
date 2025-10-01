import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const QuizScreen = () => {
  return (
    <SafeAreaView>
      <Link href={"/quiz"}>Open Quiz</Link>
      
    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({})