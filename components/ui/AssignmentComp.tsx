import supabase from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AnimatedButton from '../AnimatedButton';
import CustomAlert from './CustomAlert';

const AssignmentComp = () => {
	const [subjects, setSubjects] = useState<any[]>([]);
	const [chapters, setChapters] = useState<any[]>([]);
	const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
	const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState<string>('');
	const [showCustomAlert, setShowCustomAlert] = useState(false);
	const router = useRouter();
	// Fetch subjects
	const fetchSubjects = async () => {
		setLoading(true);
		const { data, error } = await supabase.from('book_meta_data').select('subject');
		if (error) console.log(error);
		else {
			const uniqueSubjects = Array.from(new Set(data.map((row) => row.subject)))
				.filter(Boolean)
				.map((subject) => ({ label: subject, value: subject }));
			setSubjects(uniqueSubjects);
		}
		setLoading(false);
	};

	// Fetch chapters when subject changes
	useEffect(() => {
		const fetchChapters = async () => {
			if (!selectedSubject) return;
			setLoading(true);
			const { data, error } = await supabase
				.from('book_meta_data')
				.select('title')
				.eq('subject', selectedSubject);

			if (error) console.log(error);
			else {
				const uniqueChapters = Array.from(new Set(data.map((row) => row.title)))
					.filter(Boolean)
					.map((title) => ({ label: title, value: title }));
				setChapters(uniqueChapters);
			}
			setLoading(false);
		};
		fetchChapters();
	}, [selectedSubject]);

	useEffect(() => {
		fetchSubjects();
	}, []);

	return (
		<View style={{ padding: 16, backgroundColor:"#ddd", margin:12, borderRadius:12 }}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Assignments</Text>
				<Ionicons name='information-circle-outline' size={20} color="black" onPress={() => setShowCustomAlert(true)} />
			</View>

			{/* Subject Dropdown */}
			<Text style={styles.label}>Select Subject:</Text>
			<Dropdown
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={subjects}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder="Choose a subject"
				searchPlaceholder="Search subject..."
				value={selectedSubject}
				onChange={(item) => {
					setSelectedSubject(item.value);
					setSelectedChapter(null);
				}}
				renderLeftIcon={() => (
					<Ionicons style={styles.icon} color="black" name="book-outline" size={20} />
				)}
			/>

			{/* Chapter Dropdown */}
			{selectedSubject && (
				<>
					<Text style={styles.label}>Select Chapter:</Text>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={chapters}
						search
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder="Choose a chapter"
						searchPlaceholder="Search chapter..."
						value={selectedChapter}
						onChange={(item) => setSelectedChapter(item.value)}
						renderLeftIcon={() => (
							<Ionicons style={styles.icon} color="black" name="book-outline" size={20} />
						)}
					/>
				</>
			)}
			{selectedChapter && (
				<TextInput
					style={styles.input}
					placeholder="Describe your assignment here"
					value={value}
					onChangeText={(text) => setValue(text)}
					multiline
					numberOfLines={4}
				/>
			)}
			<View style={{ marginTop: 20 }}>
				<AnimatedButton
					isLoading={loading}
					onPress={() => {
						router.push(`/generated-ques?subject=${selectedSubject}&chapter=${selectedChapter}&description=${value}`);
					}}
					title="Submit"
					width={"100%"}
				/>
			</View>
			<CustomAlert visible={showCustomAlert} onCancel={() => setShowCustomAlert(false)} onConfirm={() => setShowCustomAlert(false)}
				message="
				You can find the assignment description in the 'Assignment' section of the app.
				"
				cancelText='OK'
			/>
		</View>
	);
};

export default AssignmentComp;

const styles = StyleSheet.create({
	header: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 20,
		marginBottom: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	input: {
		marginTop: 8,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
		backgroundColor: '#f9f9f9',
	},
	label: {
		fontFamily: 'Poppins-Regular',
		fontSize: 16,
		marginVertical: 8,
	},
	dropdown: {
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
		backgroundColor: '#f9f9f9',
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
		color: '#999',
	},
	selectedTextStyle: {
		fontSize: 16,
		color: '#333',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
