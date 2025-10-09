import Quiz from '@/components/ui/Quiz'
import supabase from '@/lib/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

const QuizScreen = () => {

  const [allQuizzes, setAllQuizzes] = useState<QuizDetails[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  


  const fetchQuizzes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('title');
    if (error) console.error('Error fetching quizzes:', error);
    else {
      setAllQuizzes(data || []);
      setFilteredQuizzes(data || []);
      // console.log(data);
      
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuizzes();
  },[])

  useEffect(() => {
      if (searchQuery.trim() === '') {
        setFilteredQuizzes(allQuizzes);
      } else {
        const filtered = allQuizzes.filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.lang.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredQuizzes(filtered);
      }
    }, [searchQuery, allQuizzes]);

  return (
    <SafeAreaView>
      <View style={styles.searchBar}>
        <TextInput
          style={{ flex: 1, color: '#111' }}
          placeholder="Search"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setSearchQuery(searchQuery.trim())}>
          <Ionicons name="search" size={24} color="#111" />
        </TouchableOpacity>
      </View>

      {/* filters subjectwise */}
      <View>
        <FlatList
          style={{ paddingLeft: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={{ width: 20 }} />}
          data={['ALL', 'Maths', 'Science', 'English', 'SST']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: searchQuery === item ? '#ffd097ee' : '#ecececff',
                paddingVertical: 6,
                paddingHorizontal: 18,
                borderRadius: 20,
                marginHorizontal: 6,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: '#111',
              }}
              onPress={() => {
                if (item === 'ALL') {
                  setFilteredQuizzes(allQuizzes);
                  setSearchQuery('');
                }
                else {
                  setFilteredQuizzes(allQuizzes.filter(quiz => quiz.subject === item));
                  setSearchQuery(item);
                }
              }}
            >
              <Text style={{ fontFamily: 'Poppins-Medium' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#111" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredQuizzes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Quiz quizDetails={item}/>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ marginBottom: 200 }} />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {
            fetchQuizzes();
            setSearchQuery('');
          }} />}
        />
      )}
    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: '#dbdbdbee',
  },
});