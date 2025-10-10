import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Badge {
  xp: number;
  url: string;
  userXp: number
}

const Badge = ({xp, url, userXp}:Badge) => {
  return (
    <View style={{margin:10}}>
      {
      	userXp >= xp ? <Image source={{ uri: url }} style={{  width:100, height:115 }} /> : (
				<View style={{position:"relative"}}>
					<Image source={{ uri: url }} style={{  width:100, height:115,  }} />
					<Image source={require("@/assets/images/filter.svg")} style={{  width:100, height:115, position:"absolute", opacity:0.7 }} />
					<FontAwesome name="lock" size={24} color="black" style={{ backgroundColor:"white", padding:4, width:32, textAlign:"center", borderRadius:2, position:"absolute", top:"37%", left:"35%", paddingHorizontal:6 }} />
				</View>)
			}
    </View>
  )
}

export default Badge

const styles = StyleSheet.create({})