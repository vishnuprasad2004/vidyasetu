import supabase from '@/lib/supabase';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const AssignmentComp = () => {
  
	const [subjects, setSubjects] = useState<any>([]);
	const [chapters, setChapters] = useState<any>([]);
	const [selectedSubject, setSelectedSubject] = useState<string|null>(null);
	const [selectedChapter, setSelectedChapter] = useState<string|null>(null);
	const [loading, setLoading] = useState(false);

	const fetchSubjects = async () => {
    const { data, error } = await supabase.from('book_meta_data').select('subject');
    if (error) console.log(error);
    else {
      setSubjects(Array.from(new Set(data.map((row) => row.subject))));
      console.log(subjects);
    } 
    setLoading(false);
  };

	useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubject) return;
      // setLoading(true);
      const { data, error } = await supabase.from('book_meta_data').select('title').eq("subject", selectedSubject);
      if (error) console.log(error);
      else { 
        setChapters(Array.from(new Set(data.map((row) => row.title))));
        console.log(chapters);
        
      }
      // setLoading(false);
    };
    fetchChapters();
  }, [selectedSubject]);



	useEffect(() => {
		fetchSubjects();
	},[])
	
  return (
    <View style={{ padding:14 }}>
			<Text style={{fontFamily: "Poppins-SemiBold", fontSize: 20}}>Assignments</Text>
			<Picker
				style={styles.subjectPicker}
				selectedValue={selectedSubject}
				onValueChange={(value) => {
					setSelectedSubject(value);
					setSelectedChapter(null);
				}}
			>
				<Picker.Item style={{fontFamily:"Poppins-Regular"}} label="Select a Subject" value={null}/>
				{subjects.map((item:string) => (<Picker.Item style={{fontFamily:"Poppins-Regular"}} label={item} value={item}></Picker.Item>))}
			</Picker>
			{selectedSubject && (
				<>
					<Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Select Chapter:</Text>
					<Picker
						selectedValue={selectedChapter}
						onValueChange={(value) => setSelectedChapter(value)}
					>
						<Picker.Item style={{fontFamily:"Poppins-Regular"}} label="Choose a chapter" value={null} />
						{chapters.map((c:string) => (
							<Picker.Item label={c} value={c} />
						))}
					</Picker>
				</>
			)}
			<Button title="Generate Assignment"/>
		</View>
  )
}

export default AssignmentComp

const styles = StyleSheet.create({
	subjectPicker: {
		borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
		fontFamily:"Poppins-Regular",
		height: 50,
    color: '#333',
		fontSize:12,
  },
})