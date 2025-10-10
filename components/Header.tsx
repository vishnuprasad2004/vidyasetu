import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAppSelector } from "@/hooks/redux";

const Header = () => {

	const user = useAppSelector((state) => state.auth.user);
	
  return (
    <View style={styles.headerContainer}>
			<Link href={"/profile"}>
				<View style={styles.userProfileIcon}>
					<Image
						source={{
							uri: "https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_0.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfMC5zdmciLCJpYXQiOjE3NTkwODEyMTUsImV4cCI6NDkxMjY4MTIxNX0.27epMioe8AWazDoaQ_yfLo4KJ8Y45V2G5c40F6IbOxs",
						}}
						style={{ width: 60, height: 60, transform: [{ translateX: -6 }], zIndex:10 }}
						transition={100}
					/>
				</View>
			</Link>
			
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		padding: 10,
		gap: 10,	
		alignItems: "center",
	},
  userProfileIcon: {
    width: 50,
    height: 50,
    borderRadius: 150,
    overflow: "hidden",
    backgroundColor: "lightblue",
  },
});
