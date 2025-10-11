import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AIBot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! 👋 I'm Guru. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);



  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://vidyasetu-ai.onrender.com/api/ai/buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.data }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
          {item.content}
        </Text>
      </View>
    );
  };

  // Typing animation dots
  const renderThinking = () => {

    return (
      <View style={[styles.messageContainer, styles.botMessage]}>
        <Text style={styles.botText}>Thinking...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>🤖 Chat with Guru</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
          ListFooterComponent={loading ? renderThinking() : null}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIBot;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#F4F6F8" },
  keyboardContainer: { flex: 1 },
  headerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  chatContainer: { paddingHorizontal: 12, paddingVertical: 10, flexGrow: 1 },
  messageContainer: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 10,
    marginVertical: 6,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6f72df",
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E9ECEF",
    borderBottomLeftRadius: 4,
  },
  messageText: { fontSize: 16, lineHeight: 22 },
  userText: { color: "#fff" },
  botText: { color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  input: { flex: 1, fontSize: 16, paddingHorizontal: 10, color: "#000" },
  sendButton: {
    backgroundColor: "#6f72df",
    borderRadius: 50,
    padding: 10,
  },
});
