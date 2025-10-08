import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const QuizScreen = () => {
  return (
    <SafeAreaView>
      <Link href={"/quiz"}>Open Quiz</Link>
    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({})