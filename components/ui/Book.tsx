import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  <View style={{ backgroundColor: color, padding: 2, paddingHorizontal: 8, borderRadius: 12, margin: 2, borderWidth: 1, borderColor: "#111111aa" }}>
    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>{text}</Text>
  </View>
)

const Book = ({ board, chapter_num, id, lang, public_signed_url, subject, title }: BookDetailProps) => {
  return (
    <Link style={{ marginLeft: 10 }} href={{ pathname: "/pdf-buddy", params: { pdfUrl: public_signed_url } }}>
      <View style={[styles.book, { backgroundColor: subject === "ENGLISH" ? "#ffd097aa": subject === "SCIENCE" ? "#6aaffdaa" : "#ecececff" }]}>
        {
          subject === "ENGLISH" ? <Image source={require("@/assets/images/beehive-book.png")} style={{ height:100, width:100, borderRadius:12}}/>:
          <Image source={require("@/assets/images/science-book.png")} style={{ height:100, width:100, borderRadius:12}}/>
        }
        
        <View>
          <Text style={{ fontFamily: "Poppins-Bold", color: "#111111ee", width:160 }}>{chapter_num}. {title}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Chip text={board} color={"#ffd09799"} />
            <Chip text={subject} color={"#eeeeee99"} />
          </View>
        </View>
        <Ionicons name="chevron-back" size={40} color="#111111dd" style={{ transform: [{ rotateZ: "180deg" }] }} />
      </View>
    </Link>
  )
}

export default Book

const styles = StyleSheet.create({
  book: {
    width: "95%",
    // paddingHorizontal: 20,
    borderRadius: 20,
    padding: 10,
    // backgroundColor: "#fffaf1ff",
    margin: 10,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center",
    gap:10,
  }
})