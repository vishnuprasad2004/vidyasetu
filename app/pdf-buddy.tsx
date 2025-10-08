import BuddyChatBS from '@/components/ui/BuddyChatBS';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const PDFBuddy = () => {
  const { pdfUrl }: { pdfUrl: string } = useLocalSearchParams();
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  // Bottom sheet reference
  const bottomSheetModal = useRef<BottomSheetModal>(null);

  // Sparkle animation
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.3, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* PDF Viewer */}
        <WebView
          source={{ uri: viewerUrl }}
          style={styles.webView}
          renderLoading={() => <Text>Loading PDF...</Text>}
          startInLoadingState
        />

        {/* Floating sparkle button */}
        <View style={styles.floatingContainer}>
          <Animated.View style={[styles.sparkleButton, animatedStyle]}>
            <TouchableOpacity onPress={() => bottomSheetModal.current?.present()}>
              <Ionicons name="sparkles" size={26} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.askText}>👈 Ask Anything</Text>
        </View>

        {/* Chat Bottom Sheet */}
        <BuddyChatBS bottomSheetModalRef={bottomSheetModal as React.RefObject<BottomSheetModal>} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default PDFBuddy;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    width: '100%',
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sparkleButton: {
    backgroundColor: '#f0c519cb',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  askText: {
    marginLeft: 10,
    color: '#111',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    fontSize: 14,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
