import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface Question {
    question: string;
    marks: number;
}
const GeneratedQuestions = () => {
    const { chapter, subject, description } = useLocalSearchParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('https://vidyasetu-ai.onrender.com/api/ai/assignment-generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        subject,
                        chapter,
                        description,
                    }),
                });

                const data = await res.json();
                setQuestions(data?.data?.questions || []);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }).start();
            }
        };

        fetchQuestions();
    }, [chapter, subject, description]);

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#4a90e2" />
                <Text style={styles.loadingText}>Generating questions...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.subject}>{subject}</Text>
                <Text style={styles.chapter}>{chapter}</Text>

                <FlatList
                    data={questions}
                    keyExtractor={(_, i) => i.toString()}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    renderItem={({ item, index }) => (
                        <Animated.View
                            style={[
                                styles.card,
                                {
                                    transform: [{
                                        scale: fadeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.9, 1],
                                        })
                                    }],
                                },
                            ]}
                        >
                            <Text style={styles.questionTitle}>Q{index + 1}.</Text>
                            <Text style={styles.questionText}>{item.question}</Text>
                            <View style={styles.marksContainer}>
                                <Text style={styles.marksText}>Marks: {item.marks}</Text>
                            </View>
                        </Animated.View>
                    )}
                    ListFooterComponent={<View
                        style={{
                            height: 100
                        }}
                    ></View>}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Generate New Set</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

export default GeneratedQuestions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6fa',
        paddingHorizontal: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#555',
        fontSize: 16,
    },
    subject: {
        fontSize: 22,
        fontWeight: '700',
        color: '#4a90e2',
        textAlign: 'center',
        marginTop: 16,
    },
    chapter: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    questionTitle: {
        fontWeight: '700',
        fontSize: 15,
        color: '#333',
        marginBottom: 4,
    },
    questionText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 22,
    },
    marksContainer: {
        marginTop: 8,
        alignSelf: 'flex-end',
        backgroundColor: '#eaf1fc',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    marksText: {
        fontSize: 13,
        color: '#4a90e2',
        fontWeight: '600',
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#4a90e2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: '#4a90e2',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
