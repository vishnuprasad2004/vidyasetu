import Book from '@/components/ui/Book';
import supabase from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('book_meta_data')
      .select('*')
      .order('subject')
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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(bookDetails);
    } else {
      const filtered = bookDetails.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.lang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.board.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, bookDetails]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {
            fetchBooks();
            setSearchQuery('');
          }} />}
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
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: '#dbdbdbee',
  },
});
