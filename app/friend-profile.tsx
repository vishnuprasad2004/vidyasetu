import Badge from '@/components/ui/Badge'
import { useAppSelector } from '@/hooks/redux'
import supabase from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link, router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

interface BadgeProp {
  xp: number;
  url: string;
}


const FriendProfile = () => {
  const {friend_id} = useLocalSearchParams();
  const [user, setUser] = useState<any>();
  const [xp, setXp] = useState<any>(0);
  const [badges, setBadges] = useState<BadgeProp[]>([]);
  const [friendsData, setFriendsData] = useState<any>([]);



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
      const { data, error } = await supabase.from("users").select("*").eq("id", friend_id).single();
      if(error) throw error;
      setUser(data);
      setXp(data?.xp);
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

      <View style={{ alignItems: 'center', backgroundColor: 'lightblue', overflow: 'hidden', height: 200 }}>
        <Image source={{ uri: user?.avatar }} style={{ width: 270, height: 270, }} />
      </View>

      <ScrollView style={{ padding: 20, backgroundColor: '#fefefe', height: '100%', marginTop: -18, transform:[{translateY:18}] }}>
        
        <Text style={{ fontSize: 24, fontFamily: 'Poppins-Bold', marginTop: 10 }}>{user?.full_name}</Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: 'gray' }}>{user?.email}</Text>
        <View>
          <View>
          {/* followers and following section */}
          <View style={{flexDirection:"row", padding:12, justifyContent:"space-around",margin:4,}}>
            {/* following */}
            <View>
              {/* <Text style={styles.followNumber}>15</Text> */}
              <Text style={styles.followText}>{1} Follower</Text>
            </View>
            {/* line */}
            <View style={{width:2, backgroundColor:"#aaa", borderRadius:2}}></View>
            {/* followers */}
            <View>
              {/* <Text style={styles.followNumber}>15</Text> */}
              <Text style={styles.followText}>{0} Following</Text>
            </View>
          </View>

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
        <View style={{marginBottom:20}}></View>
      </ScrollView>



    </SafeAreaView>
  )
}

export default FriendProfile

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
    borderRadius:12,
  },
  headerText: {fontFamily:"Poppins-Bold", fontSize:24, marginVertical:4},
  followText: {
    fontFamily: "Poppins-SemiBold",
    fontSize:16
  },
  followNumber: {

  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex:100,
    width:"100%",
    height:"120%"
  },
  modalContent: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  modalButtonAdd: {
    flex: 1,
    backgroundColor: "#6f72df",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
})