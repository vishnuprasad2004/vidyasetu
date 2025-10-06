import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

interface BookDetailProps {
  id: number;
  title: string;
  public_signed_url: string;
  lang: string;
  subject: string;
  chapter_num: number;
  board: string;
}

const Chip = ({ text, color }: { text: string, color: string }) => (
    <View style={{backgroundColor: "#aaa", padding: 2, paddingHorizontal:8, borderRadius: 15, margin: 2}}>
        <Text style={{fontFamily:"Poppins-Regular", fontSize: 12}}>{text}</Text>
    </View>
)

const Book = ({ board, chapter_num, id, lang, public_signed_url, subject, title }:BookDetailProps) => {
  return (
    <Link style={{marginLeft:10}} href={{pathname: "/pdf-buddy", params: { pdfUrl: public_signed_url }}}>
      <View style={[styles.book, {backgroundColor: "#fffaf1ff"}]}>
        <Text style={{fontFamily:"Poppins-Regular"}}>{chapter_num}. {title}</Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Chip text={board} color={""} /> 
          <Chip text={lang} color={""} /> 
          <Chip text={subject} color={""}/>
        </View>
      </View>
    </Link>
  )
}

export default Book

const styles = StyleSheet.create({
    book: {
        width: "95%",
        paddingHorizontal: 20,
        borderRadius: 20,
        padding: 15,
        backgroundColor: "#fffaf1ff",
        margin: 10,
        borderWidth: 1,
        borderColor: "#111",
        // display: 'flex',
        marginLeft:20,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 2
    }
})