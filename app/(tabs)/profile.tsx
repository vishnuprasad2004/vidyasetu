import ActionModal from '@/components/ActionModal'
import AnimatedButton from '@/components/AnimatedButton'
import { useAppSelector } from '@/hooks/redux'
import supabase from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [xp, setXp] = useState<number>(120);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {/* <StatusBar backgroundColor='lightblue'/> */}
      <View style={{ alignItems: 'center', backgroundColor: 'lightblue', overflow: 'hidden', height: 200 }}>
        <Image source={{ uri: 'https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_0.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfMC5zdmciLCJpYXQiOjE3NTkwODEyMTUsImV4cCI6NDkxMjY4MTIxNX0.27epMioe8AWazDoaQ_yfLo4KJ8Y45V2G5c40F6IbOxs' }} style={{ width: 270, height: 270, }} />
      </View>

      <ScrollView style={{ padding: 20, backgroundColor: '#fefefe', height: '100%', marginTop: -18, transform:[{translateY:18}] }}>
        <Text style={{ fontSize: 24, fontFamily: 'Poppins-Bold', marginTop: 10 }}>{user.name}</Text>
        <Text style={{ fontSize: 16, }}>{"@vishnuprasadkorada"}</Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: 'gray' }}>{user.email}</Text>
        <View>
          <View >
          {/* followers and following section */}
          <View style={{flexDirection:"row", padding:12, justifyContent:"space-around",margin:4,}}>
            {/* following */}
            <View>
              {/* <Text style={styles.followNumber}>15</Text> */}
              <Text style={styles.followText}>{15} Following</Text>
            </View>
            {/* line */}
            <View style={{width:2, backgroundColor:"#aaa", borderRadius:2}}></View>
            {/* followers */}
            <View>
              {/* <Text style={styles.followNumber}>15</Text> */}
              <Text style={styles.followText}>{20} Following</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.addFriendsButton}
            onPress={() => {}}
          >
            <Ionicons name="person-add" size={20} color="#1cb0f6" />
            <Text style={{color:"#1cb0f6", fontFamily:"Poppins-SemiBold", fontSize:16}}>ADD FRIENDS</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Overview</Text>
          {/* XP */}
          <View style={styles.XPContainer}>
            <Image source={require("@/assets/images/High Voltage.png")} style={{width:25, height:35}}/>
            <View style={{}}>
              <Text style={{fontFamily:"Poppins-SemiBold", fontSize:20, marginBottom:-8}}>{xp}</Text>
              <Text style={{fontFamily:"Poppins-Bold", fontSize:12, color:"#555"}}>Total XP</Text>
            </View>
          </View>

          <Text style={styles.headerText}>Badges</Text>
          <View>
            <FlatList
              data={["https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/public/badges/100xp.png",""]}
              renderItem={(item) => (<Image source={{uri:item.item}} style={{  width:100, height:115 }}/>)}
              ListEmptyComponent={(<View style={{marginBottom:200}}></View>)}
            />
            {/* <FlatList
              horizontal
              data={["https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/public/badges/200xp.png","https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/public/badges/300xp.png"]}
              renderItem={(item) => (<Image source={{uri:item.item}} style={{ padding:12, width:100, height:115 }}/>)}
              ListEmptyComponent={(<View style={{marginBottom:200}}></View>)}
            /> */}
          </View>
        </View>
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
        <View style={{marginBottom:60}}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  XPContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    gap:10,
    padding:10,
    borderRadius:18,
    borderWidth:2,
    width:"45%",
    borderColor:"#ddddddff",
  },
  addFriendsButton: {
    width:"100%",
    padding:8,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:10,
    borderColor:"#ddddddff",
    borderBottomWidth:6,
    borderWidth:2,
    borderRadius:12
  },
  headerText: {fontFamily:"Poppins-Bold", fontSize:24, marginVertical:4},
  followText: {
    fontFamily: "Poppins-SemiBold",
    fontSize:16
  },
  followNumber: {

  }
})