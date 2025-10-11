import ActionModal from '@/components/ActionModal'
import AnimatedButton from '@/components/AnimatedButton'
import Badge from '@/components/ui/Badge'
import { useAppSelector } from '@/hooks/redux'
import supabase from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

interface BadgeProp {
  xp: number;
  url: string;
}


const ProfileScreen = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [xp, setXp] = useState<any>(0);
  const [badges, setBadges] = useState<BadgeProp[]>([]);
  const [userCreatedAt, setUserCreatedAt] = useState(null);

  const fetchBadges = async() => {
    try{
      const { data, error } = await supabase.from("badges").select("*");
      if(error) throw error;
      setBadges(data);    
    } catch(error:any) {
      console.log("Error fetching the badges");
      console.log(error);
    }
  }

  const fetchUserDetails = async() => {
    try{
      const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single();
      if(error) throw error;
      // setBadges(data);
      setXp(data.xp);
    } catch(error:any) {
      console.log("Error fetching the badges");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBadges();
  })

  useEffect(() => {
    fetchUserDetails();
  },[]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {/* <StatusBar backgroundColor='lightblue'/> */}

      <TouchableOpacity activeOpacity={1} style={{ position:"absolute", top:40, right:20, zIndex:22 }} onPress={()=> {router.push("/settings")}}>
        <Ionicons name="settings-outline" size={26} color="black" style={{}}/>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', backgroundColor: 'lightblue', overflow: 'hidden', height: 200 }}>
        <Image source={{ uri: 'https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_4.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfNC5zdmciLCJpYXQiOjE3NjAxNTQ2MzIsImV4cCI6NDkxMzc1NDYzMn0.AsyuRrUbzMlSjDEBCAH11VGhHubi5e4LCz2DWcsN_e4' }} style={{ width: 270, height: 270, }} />
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
          <Text style={{ fontFamily:"Poppins-SemiBold", fontSize:12, marginTop:-12 }}>Unlock all bagdes by completing quizzes and earning XP points.</Text>
          <View>
            <FlatList
              horizontal
              data={badges}
              renderItem={(item) => (<Badge url={item.item.url} xp={item.item.xp} userXp={xp} />)}
              ListEmptyComponent={(<View style={{marginBottom:200}}></View>)}
            />

            <View style={{marginBottom:100}}></View>
            
          </View>
        </View>
        </View>
        {/* <ActionModal
          visible={showLogoutAlert}
          title='Logout'
          message="Are you sure you want to sign out?"
          onCancel={() => setShowLogoutAlert(false)}
          onConfirm={() => supabase.auth.signOut()}
        /> */}
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