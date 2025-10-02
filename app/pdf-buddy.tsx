import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import PdfRendererView from 'react-native-pdf-renderer';
import { WebView } from 'react-native-webview';


const PDFBuddy = () => {

	const pdfUrl = "https://yjdpdbovskmuuxxkauxj.supabase.co/storage/v1/object/sign/books/class_9th/science/iesc101.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YTIwYzQ2YS1iMmEzLTRlZWItOTFiNS0yYmUxNTg4NTVmNWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJib29rcy9jbGFzc185dGgvc2NpZW5jZS9pZXNjMTAxLnBkZiIsImlhdCI6MTc1OTQyNzA2NiwiZXhwIjo0OTEzMDI3MDY2fQ.b5Qjs_xh6LvTGHjYt8C3SrHHvFoXqHt9-qdkKLFlOIQ";
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;


  return (
    <SafeAreaView style={{flex: 1}}>

      <WebView
        source={{ uri: viewerUrl }}
        style={{ flex: 1, height: '100%', width: '107%', marginLeft: -15 }}
      />    
			<TextInput />
    </SafeAreaView>
  )
}

export default PDFBuddy

const styles = StyleSheet.create({})