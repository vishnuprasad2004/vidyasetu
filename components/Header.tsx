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
							uri: "https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/assets/avatars/avatar_4.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYXZhdGFycy9hdmF0YXJfNC5zdmciLCJpYXQiOjE3NjAxNTQ2MzIsImV4cCI6NDkxMzc1NDYzMn0.AsyuRrUbzMlSjDEBCAH11VGhHubi5e4LCz2DWcsN_e4",
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
