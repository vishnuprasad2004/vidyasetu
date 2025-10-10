import ActionModal from '@/components/ActionModal'
import AnimatedButton from '@/components/AnimatedButton'
import { useAppSelector } from '@/hooks/redux'
import supabase from '@/lib/supabase'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {/* <StatusBar backgroundColor='lightblue'/> */}
      <View style={{ alignItems: 'center', backgroundColor: 'lightblue', overflow: 'hidden', height: 200 }}>
        <Image source={{ uri: 'https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_0.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfMC5zdmciLCJpYXQiOjE3NTkwODEyMTUsImV4cCI6NDkxMjY4MTIxNX0.27epMioe8AWazDoaQ_yfLo4KJ8Y45V2G5c40F6IbOxs' }} style={{ width: 250, height: 250 }} />
      </View>

      <View style={{ padding: 20, borderRadius: 14, backgroundColor: '#fefefe', height: '100%', marginTop: -10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{user.name}</Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: 'gray' }}>{user.email}</Text>
        <View>
          <AnimatedButton
            width="100%"
            title='Sign Out'
            color={"#fb5219ff"}
            shadowColor={"#d03704ff"}
            onPress={() => setShowLogoutAlert(true)}
          />
        </View>
        <ActionModal
          visible={showLogoutAlert}
          title='Logout'
          message="Are you sure you want to sign out?"
          onCancel={() => setShowLogoutAlert(false)}
          onConfirm={() => supabase.auth.signOut()}
        />
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})