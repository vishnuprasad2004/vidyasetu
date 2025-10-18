import Badge from '@/components/ui/Badge'
import { useAppSelector } from '@/hooks/redux'
import supabase from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [friendsData, setFriendsData] = useState<any>([]);

  const addFollower = async () => {
    if (!friendEmail.trim()) {
      Alert.alert("Error", "Email cannot be empty.");
      setIsAddFriendModalVisible(false);
      return;
    }
    try {
      const { data, error } = await supabase.from("users").select("id").eq("email", friendEmail.trim()).single();
      if (error) {
        throw error;
      }
      const { data: friendsData, error: friendsError } = await supabase.from("friends").insert({
        user_id: user?.id, // Current user's ID
        follower: data.id, // Friend's email
      });

      if (error) {
        console.error("Error adding friend:", error);
        Alert.alert("Error", "Could not add friend. Please try again.");
      } else {
        Alert.alert("Success", "Friend added successfully!");
        console.log("Friend added:", data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsAddFriendModalVisible(false); // Close the modal
      setFriendEmail(""); // Clear the input
    }
  };

  const fetchFriends = async () => {
    try {
      const { data, error } = await supabase.from("friends").select(`
        follower(id,avatar,full_name,xp)  
      `).eq("user_id", user.id);
      setFriendsData(data);
      if (error) throw error;
      console.log(data);
    } catch (error: any) {
      console.log("Error fetching the badges");
      console.log(error);
    }
  }

  const fetchBadges = async () => {
    try {
      const { data, error } = await supabase.from("badges").select("*");
      if (error) throw error;
      setBadges(data);
    } catch (error: any) {
      console.log("Error fetching the badges");
      console.log(error);
    }
  }

  const fetchUserDetails = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single();
      if (error) throw error;
      // setBadges(data);
      setXp(data.xp);
    } catch (error: any) {
      console.log("Error fetching the badges");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBadges();
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchFriends();
    setIsAddFriendModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {/* <StatusBar backgroundColor='lightblue'/> */}

      <TouchableOpacity activeOpacity={1} style={{ position: "absolute", top: 40, right: 20, zIndex: 22 }} onPress={() => { router.push("/settings") }}>
        <Ionicons name="settings-outline" size={26} color="black" style={{}} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', backgroundColor: 'lightblue', overflow: 'hidden', height: 200 }}>
        <Image source={{ uri: 'https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_4.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfNC5zdmciLCJpYXQiOjE3NjAxNTQ2MzIsImV4cCI6NDkxMzc1NDYzMn0.AsyuRrUbzMlSjDEBCAH11VGhHubi5e4LCz2DWcsN_e4' }} style={{ width: 270, height: 270, }} />
      </View>

      <ScrollView style={{ padding: 20, backgroundColor: '#fefefe', height: '100%', marginTop: -18, transform: [{ translateY: 18 }] }}>

        <Text style={{ fontSize: 24, fontFamily: 'Poppins-Bold', marginTop: 10 }}>{user.name}</Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: 'gray' }}>{user.email}</Text>
        <View>
          <View>
            {/* followers and following section */}
            <View style={{ flexDirection: "row", padding: 12, justifyContent: "space-around", margin: 4, }}>
              {/* following */}
              <View>
                {/* <Text style={styles.followNumber}>15</Text> */}
                <Text style={styles.followText}>{0} Follower</Text>
              </View>
              {/* line */}
              <View style={{ width: 2, backgroundColor: "#aaa", borderRadius: 2 }}></View>
              {/* followers */}
              <View>
                {/* <Text style={styles.followNumber}>15</Text> */}
                <Text style={styles.followText}>{1} Following</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.addFriendsButton}
              onPress={() => setIsAddFriendModalVisible(true)}
            >
              <Ionicons name="person-add" size={20} color="#1cb0f6" />
              <Text style={{ color: "#1cb0f6", fontFamily: "Poppins-SemiBold", fontSize: 16 }}>ADD FRIENDS</Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>Friends</Text>
            <View>
              <FlatList
                horizontal
                data={friendsData}
                renderItem={(item) => (
                  <Link href={{ pathname: "/friend-profile", params: { friend_id: item.item.follower.id } }}>
                    <Image source={{ uri: item.item.follower.avatar }} style={{ height: 60, width: 60, borderRadius: 70, backgroundColor: "wheat" }} />
                  </Link>
                )}
              />
            </View>

            <Text style={styles.headerText}>Overview</Text>
            {/* XP */}
            <View style={styles.XPContainer}>
              <Image source={require("@/assets/images/High Voltage.png")} style={{ width: 25, height: 35 }} />
              <View style={{}}>
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -8 }}>{xp}</Text>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 12, color: "#555" }}>Total XP</Text>
              </View>
            </View>

            <Text style={styles.headerText}>Badges</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginTop: -12 }}>Unlock all bagdes by completing quizzes and earning XP points.</Text>
            <View>
              <FlatList
                horizontal
                data={badges}
                renderItem={(item) => (<Badge url={item.item.url} xp={item.item.xp} userXp={xp} />)}
                ListEmptyComponent={(<View style={{ marginBottom: 200 }}></View>)}
              />

              <View style={{ marginBottom: 100 }}></View>

            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}></View>
      </ScrollView>


      {isAddFriendModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Friend</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter friend's email"
              placeholderTextColor="#888"
              value={friendEmail}
              onChangeText={setFriendEmail}
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => {
                  setIsAddFriendModalVisible(false);
                  setFriendEmail("");
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonAdd} onPress={addFollower}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  XPContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    padding: 10,
    borderRadius: 18,
    borderWidth: 2,
    width: "45%",
    borderColor: "#ddddddff",
  },
  addFriendsButton: {
    width: "100%",
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderColor: "#ddddddff",
    borderBottomWidth: 6,
    borderWidth: 2,
    borderRadius: 12,
  },
  headerText: { fontFamily: "Poppins-Bold", fontSize: 24, marginVertical: 4 },
  followText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16
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
    zIndex: 100,
    width: "100%",
    height: "120%"
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