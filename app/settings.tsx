import ActionModal from '@/components/ActionModal'
import AnimatedButton from '@/components/AnimatedButton'
import { useAppSelector } from '@/hooks/redux'
import supabase from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
	const user = useAppSelector((state) => state.auth.user);
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);
	const [newName, setNewName] = useState("");
	const [loading, setLoading] = useState(false);


	const updateDetails = () => {
		if(!newName.trim() || newName.trim() === "") {
			Alert.alert("You cannot remove your name");
			return;
		}
		Alert.alert("Confirmation", "Are you sure about changing your details",
			[
				{
					text:"Cancel",
					style:"cancel",
					onPress:() => {}
				}, 
				{
					text:"Yes",
					style:"default",
					onPress:() => {
						supabase.from("users").update({ full_name: newName.trim() }).eq("id", user.id).select().then((val) => {
							console.log(val);
						})
					}
				}
			]
		)
	};


	useEffect(()=> {
		setNewName(user.name);
	},[]);
  return (
    <SafeAreaView style={{ padding:12, flex:1 }}>
      <Text style={styles.headerText}>Settings</Text>
			<Text style={{fontFamily: "Poppins-Medium"}}>Change Name</Text>
			<TextInput 
				style={{ borderWidth:2, borderRadius:12, borderColor:"#999", color:"#111", paddingLeft:12 }}
				onChangeText={(text) => setNewName(text)}
				value={newName}
				placeholder='Change your name'
			/>
			<TouchableOpacity style={styles.submitButton} activeOpacity={0.9} onPress={updateDetails}>
				{
					loading ? <ActivityIndicator color={"black"}></ActivityIndicator> : <Text style={{fontFamily:"Poppins-Medium",}}>Update the Details</Text>
				}
			</TouchableOpacity>
			<View style={{position:"absolute", width:"100%", bottom:32, flexDirection:"row", justifyContent:"center", paddingLeft:18 }}>
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
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
	headerText: {
		fontFamily:"Poppins-Bold", 
		fontSize:24, 
		marginVertical:4
	},
	submitButton: { 
		flexDirection:"row", 
		justifyContent:"center", 
		padding:12,
		borderWidth:2,
		borderBottomWidth:4,
		borderRadius:12,
		marginTop: 12,
		borderColor:"#999999"
	}
})