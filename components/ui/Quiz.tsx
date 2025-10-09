import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { Image } from 'expo-image';

interface QuizDetails {
  id: string;
  title: string;
  created_at: string;
  lang: string;
  subject: string;
  description: string;
  no_of_questions: number;
  time_required_minutes: number;
}

const Quiz = ({quizDetails}: {quizDetails:QuizDetails}) => {
	// console.log(quizDetails.desciption);
	
  return (
    <Link href={{ pathname: "/quiz", params: { quizId: quizDetails.id } }} style={{ marginLeft: 10 }}>
			<View style={styles.quiz}>
				{
					quizDetails.subject === "SCIENCE" ? <Image source={require(`@/assets/images/science.png`)} style={{height:100, width:100, borderRadius: 12}}/> :
					quizDetails.subject === "ENGLISH" ? <Image source={require(`@/assets/images/english.png`)} style={{height:100, width:100, borderRadius: 12}}/> :
					quizDetails.subject === "MATHS" ? <Image source={require(`@/assets/images/maths.png`)} style={{height:100, width:100, borderRadius: 12}}/> :
					<Image source={require(`@/assets/images/studying.png`)} style={{height:100, width:100, borderRadius: 12}}/>
				}
				<View style={{ }}>
					<Text style={[styles.text, {fontSize:12}]}>{quizDetails.subject}</Text>
					<Text style={[styles.boldText, { width:150 }]}>{quizDetails.title}</Text>
					<Text style={[{ fontFamily: "Poppins-SemiBold",fontSize:12, color:"#555" }]}>{quizDetails.no_of_questions} Questions - {quizDetails.time_required_minutes} mins</Text>
				</View>
				<Ionicons name="chevron-back" size={40} color="#111111dd" style={{ transform: [{ rotateZ: "180deg" }] }} />
			</View>
    </Link>
  )
}

export default Quiz

const styles = StyleSheet.create({
	boldText: {
		fontFamily: "Poppins-Bold",
	},
	text: {
		fontFamily: "Poppins-Regular"
	},
	quiz: {
		display: "flex",
    width: "95%",
    // paddingHorizontal: 20,
    borderRadius: 20,
    padding: 12,
    backgroundColor: "#ecececff",
    flexDirection: 'row',
    justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
  }
})