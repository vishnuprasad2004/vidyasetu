import Book from '@/components/ui/Book';
import supabase from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BookDetails {
  id: number;
  title: string;
  public_signed_url: string;
  created_at: string;
  lang: string;
  subject: string;
  chapter_num: number;
  board: string;
}

const BuddyScreen = () => {
  const [bookDetails, setBookDetails] = useState<BookDetails[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookDetails[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('book_meta_data')
      .select('*')
      .order('subject',{ ascending: false })
      .order('chapter_num');

    if (error) console.error('Error fetching books:', error);
    else {
      setBookDetails(data || []);
      setFilteredBooks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Corrected filtering logic
  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = bookDetails.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.subject.toLowerCase().includes(query) ||
        book.lang.toLowerCase().includes(query) ||
        book.board.toLowerCase().includes(query);

      const matchesSubject =
        selectedSubject === 'All Subjects' || book.subject === selectedSubject;

      return matchesSearch && matchesSubject;
    });

    setFilteredBooks(filtered);
  }, [searchQuery, selectedSubject, bookDetails]);

  const getUniqueSubjects = () => [
    'All Subjects',
    ...Array.from(new Set(bookDetails.map((b) => b.subject))),
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <TextInput
          style={{ flex: 1, color: '#111' }}
          placeholder="Search books, subjects, or languages"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={22} color="#111" />
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
                  setFilteredBooks(bookDetails);
                  setSearchQuery('');
                }
                else {
                  setFilteredBooks(bookDetails.filter(book => book.subject === item));
                  setSearchQuery(item);
                }
              }}
            >
              <Text style={{ fontFamily: 'Poppins-Medium' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 🧠 Subject Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subjectScroll}
      >
        {getUniqueSubjects().map((subject) => {
          const isSelected = selectedSubject === subject;
          return (
            <TouchableOpacity
              key={subject}
              onPress={() => setSelectedSubject(subject)}
              activeOpacity={0.8}
              style={[
                styles.subjectChip,
                isSelected && styles.subjectChipSelected,
                {
                  shadowColor: isSelected ? '#444' : '#000',
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 3,
                },
              ]}
            >
              <Ionicons
                name="book-outline"
                size={14}
                color={isSelected ? '#fff' : '#222'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.subjectText,
                  isSelected && styles.subjectTextSelected,
                ]}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 📚 Book List */}
      {loading ? (
        <ActivityIndicator size="large" color="#111" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Book
              board={item.board}
              chapter_num={item.chapter_num}
              id={item.id}
              lang={item.lang}
              public_signed_url={item.public_signed_url}
              subject={item.subject}
              title={item.title}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ marginBottom: 100 }} />}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                fetchBooks();
                setSearchQuery('');
                setSelectedSubject('All Subjects');
              }}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default BuddyScreen;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
  subjectScroll: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  subjectChip: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 30,
    marginBottom: 10,
  },
  subjectChipSelected: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  subjectText: {
    fontSize: 10,
    color: '#222',
    fontWeight: '500',
  },
  subjectTextSelected: {
    color: '#fff',
  },
});
