import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface BuddyChatBSProps {
    bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const BuddyChatBS = ({ bottomSheetModalRef }: BuddyChatBSProps) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const scrollViewRef = useRef<BottomSheetScrollView>(null);
    const snapPoints = useMemo(() => ["80%"], []);

    // ✅ Keyboard listeners
    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", e => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
        });
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // ✅ Auto-scroll to bottom when messages change
    useEffect(() => {
        const timeout = setTimeout(() => {
            scrollViewRef.current?.scrollToEnd?.({ animated: true });
        }, 100);
        return () => clearTimeout(timeout);
    }, [messages]);

    // ✅ Send message
    const handleSend = useCallback(async () => {
        if (!input.trim()) return;
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        Keyboard.dismiss();

        try {
            setIsLoading(true);

            // Prepare full conversation for backend
            const body = {
                messages: messages
                    .concat(userMessage)
                    .map(m => ({ role: m.role, content: m.content })),
            };

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE_URL}/ai/chat`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (data?.data?.response) {
                const aiMessage: Message = {
                    id: Date.now().toString() + "_ai",
                    role: "assistant",
                    content: data.data.response,
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                const errMsg: Message = {
                    id: Date.now().toString() + "_error",
                    role: "assistant",
                    content: "Sorry, I couldn't process your request.",
                };
                setMessages(prev => [...prev, errMsg]);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [input, messages]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetModal}
            handleIndicatorStyle={styles.handleIndicator}
            enablePanDownToClose
            keyboardBehavior="interactive"
            android_keyboardInputMode="adjustResize"
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.chatTitle}>🤖 AI Study Buddy</Text>
                </View>

                {/* Messages */}
                <BottomSheetScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        paddingBottom: 80 + keyboardHeight,
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map(item => (
                        <View
                            key={item.id}
                            style={[
                                styles.messageContainer,
                                item.role === "user"
                                    ? styles.userMessage
                                    : styles.aiMessage,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.messageText,
                                    item.role === "user"
                                        ? styles.userText
                                        : styles.aiText,
                                ]}
                            >
                                {item.content}
                            </Text>
                        </View>
                    ))}

                    {isLoading && (
                        <View style={styles.thinkingBubble}>
                            <Text style={{ color: "#aaa" }}>Thinking...</Text>
                        </View>
                    )}
                </BottomSheetScrollView>

                {/* Input */}
                <View
                    style={[
                        styles.inputWrapper,
                        {
                            position: "absolute",
                            bottom: keyboardHeight > 0 ? keyboardHeight : 10,
                            left: 10,
                            right: 10,
                        },
                    ]}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message..."
                        placeholderTextColor="#888"
                        value={input}
                        onChangeText={setInput}
                        editable={!isLoading}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        style={[
                            styles.sendButton,
                            { opacity: input.trim() ? 1 : 0.6 },
                        ]}
                        disabled={!input.trim() || isLoading}
                    >
                        <Ionicons name="send" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </BottomSheetModal>
    );
};

export default BuddyChatBS;

const styles = {
    bottomSheetModal: {
        backgroundColor: "#1e1e1ecc",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handleIndicator: {
        backgroundColor: "#f0a0a0ff",
        width: 40,
    },
    header: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        alignItems: "center" as const,
    },
    chatTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    messageContainer: {
        maxWidth: "75%",
        borderRadius: 16,
        padding: 12,
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    aiMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#2c2c2c",
        borderTopLeftRadius: 0,
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#007AFF",
        borderTopRightRadius: 0,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    aiText: { color: "#fff" },
    userText: { color: "#fff" },
    thinkingBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#2c2c2c",
        borderRadius: 16,
        padding: 10,
        marginVertical: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center" as "center",
        backgroundColor: "#2e2e2e",
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    textInput: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        maxHeight: 120,
    },
    sendButton: {
        backgroundColor: "#007AFF",
        borderRadius: 24,
        padding: 10,
        marginLeft: 8,
    },
};
