import { Animated, Easing, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import PdfRendererView from 'react-native-pdf-renderer';
import { WebView } from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';

const PDFBuddy = () => {

  const { pdfUrl } : { pdfUrl: string } = useLocalSearchParams();
	const [isTextInputVisible, setIsTextInputVisible] = React.useState(false);
	const textInputAnimation = useRef(new Animated.Value(0)).current;
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  const toggleTextInput = () => {
    if (isTextInputVisible) {
      // Animate the TextInput out
      Animated.timing(textInputAnimation, {
        toValue: 0, // Move back to the initial position
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        setIsTextInputVisible(false); // Hide the TextInput after animation
        Keyboard.dismiss(); // Dismiss the keyboard
      });
    } else {
      setIsTextInputVisible(true); // Show the TextInput
      // Animate the TextInput in
      Animated.timing(textInputAnimation, {
        toValue: 1, // Move to the visible position
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

	const animatedWidth = textInputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 300], // Adjust the width range (collapsed to expanded)
  });

  return (
    <SafeAreaView style={{flex: 1}}>

      <WebView
        source={{ uri: viewerUrl }}
        style={{ flex: 1, height: '100%', width: '120%', marginLeft: -37 }}
        renderLoading={() => <Text>Loading PDF...</Text>}
      />    
			{/* the whole floating part */}
			<View style={{position: 'absolute', bottom: 20, width: '100%'}}>
				{/* bottom panel */}
				<View style={styles.bottomPanel}>
					<Animated.View style={[styles.animatedContainer, { width: animatedWidth }]}>
            <TouchableOpacity onPress={toggleTextInput} style={styles.sparkleButton}>
              <Ionicons name="sparkles" size={24} color={'black'} />
            </TouchableOpacity>
            {isTextInputVisible && (
							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10}}>
								<TextInput
									style={styles.queryInput}
									multiline
									placeholder="Search..."
									placeholderTextColor="#888"
								/>
								<Ionicons name="search" size={24} color={'black'}  />
							</View>
            )}
          </Animated.View>
				</View>
			</View>
    </SafeAreaView>
  )
}

export default PDFBuddy

// const styles = StyleSheet.create({
// 	sparkleButton: {
// 		// marginBottom: 10,
// 	},
// 	bottomPanel: {
// 		backgroundColor: '#ffd097dd',
// 		padding: 10,
// 		borderRadius: 30,
// 		// alignSelf: 'flex-end',
// 		marginRight: 20,
// 		// padding: 10,
// 	},
// 	queryInput: {
// 		borderWidth: 1,
// 		borderColor: '#111111',
// 		borderRadius: 40,
// 		padding: 10,
// 		margin: 10,
// 		fontFamily: 'Poppins-Medium',
// 		backgroundColor: '#fffaf1ff',
// 		color: 'black',
// 		fontSize: 14,
// 		position: 'absolute',
// 		bottom: 8,
// 		width: '95%',
// 		alignSelf: 'center',
// 		zIndex: 10, // Ensure the input is above other content
// 		paddingLeft: 20
// 	},
// 	animatedContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     overflow: 'hidden', // Ensure the TextInput doesn't overflow
//     borderRadius: 30,
//     backgroundColor: '#fffaf1ff',
//   },
// })

const styles = StyleSheet.create({
  sparkleButton: {
    marginLeft: 10,
  },
  bottomPanel: {
    // backgroundColor: '#ffd097dd',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  animatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', // Ensure the TextInput doesn't overflow
    borderRadius: 30,
    backgroundColor: '#fffaf1ff',
  },
  queryInput: {
    flex: 1,
    padding: 10,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 14,
  },
});