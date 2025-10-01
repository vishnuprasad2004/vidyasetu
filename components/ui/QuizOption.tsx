import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface QuizOptionProps {
	text: string;
	isSelected: boolean;
	onPress: () => void;
}

const QuizOption = ({text, onPress, isSelected}: QuizOptionProps) => {
  return (
    <TouchableOpacity
			activeOpacity={1}
      style={[
        styles.option,
        isSelected && styles.selectedOption, // Apply selected style if isSelected is true
      ]}
      onPress={onPress} // Call the onPress handler when pressed
    >
			
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default QuizOption

const styles = StyleSheet.create({
  option: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: "center",
    backgroundColor: '#ffffffdd',
    padding: 14,
    borderRadius: 40,
		borderWidth: 1,
		borderColor: '#111111',
  },
  selectedOption: {
		backgroundColor: '#ffd097dd', // Highlight selected option
  },
  optionText: {
		fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 18,
  },
});