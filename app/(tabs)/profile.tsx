import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
      {/* <StatusBar backgroundColor='lightblue'/> */}
      <View style={{alignItems: 'center', backgroundColor: 'lightblue',overflow: 'hidden', height:200 }}>
        <Image source={{uri: 'https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_0.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfMC5zdmciLCJpYXQiOjE3NTkwODEyMTUsImV4cCI6NDkxMjY4MTIxNX0.27epMioe8AWazDoaQ_yfLo4KJ8Y45V2G5c40F6IbOxs'}} style={{width: 250, height: 250}} />
      </View>

      <View style={{padding: 20, borderRadius:14 ,backgroundColor: '#fefefe', height: '100%', marginTop: -10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 10}}>John Doe</Text>
        {/* <Text style={{fontSize: 16, textAlign: 'center', color: 'gray'}}>. */}
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})