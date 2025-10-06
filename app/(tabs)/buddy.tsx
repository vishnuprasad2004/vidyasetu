import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import supabase from '@/lib/supabase'
import Book from '@/components/ui/Book'
import { Ionicons } from '@expo/vector-icons'

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

  const [bookDetails, setBookDetails] = useState<BookDetails[]|null>(null);

  useEffect(() => {
    supabase.from('book_meta_data').select('*').order("subject").order("chapter_num").then((res) => {
      setBookDetails(res.data);
    })
  },[])

  return (
    <SafeAreaView >
      <View>
        <TextInput style={styles.searchBar} onChangeText={() => {}} />
        <TouchableOpacity><Ionicons name='search' size={24} color={"#111111"}/></TouchableOpacity>
      </View>
      <FlatList
      style={{width: "100%", }}
        data={bookDetails ?? []}
        renderItem={({item}) => (
          <Book 
            board={item.board} 
            chapter_num={item.chapter_num} 
            id={item.id} 
            lang={item.lang} 
            public_signed_url={item.public_signed_url} 
            subject={item.subject} 
            title={item.title} 
            key={item.id}
          />
        )}
        // refreshControl={<ActivityIndicator/>}
        ListFooterComponent={<View style={{marginBottom:100}}></View>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  )
}

export default BuddyScreen

const styles = StyleSheet.create({
  searchBar: {
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 50,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#dbdbdbee',
    color: 'black',
    fontSize: 14,
  }
})