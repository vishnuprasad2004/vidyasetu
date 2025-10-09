import supabase from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Question {
    id: string;
    quiz_id: string;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
}

interface QuizResult {
    id: string;
    user_id: string;
    marked_option: string;
    question: Question;
}

const QuizResults = () => {
    const params = useLocalSearchParams();
    const [results, setResults] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from('quiz_result')
                .select(`
          id,
          user_id,
          marked_option,
          questions(
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option
          )
        `)
                .eq('quiz_id', params.quizId)
                .order('id');
            if (error) console.error(error);
            else setResults(
                (data || []).map((item: any) => ({
                    ...item,
                    question: Array.isArray(item.questions) ? item.questions[0] : item.questions,
                }))
            );
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loading}>Loading Results...</Text>
            </SafeAreaView>
        );
    }

    const total = results.length;
    const correct = results.filter(
        (r) => r.marked_option === r.question.correct_option
    ).length;
    const percentage = Math.round((correct / total) * 100);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Header Summary */}
                <View style={styles.summaryBox}>
                    <Text style={styles.title}>Quiz Results</Text>
                    <Text style={styles.subtitle}>
                        You scored {correct}/{total} ({percentage}%)
                    </Text>
                </View>

                {/* Result List */}
                {results.map((item, index) => {
                    const q = item.question;
                    const isCorrect = item.marked_option === q.correct_option;

                    return (
                        <View key={item.id} style={styles.questionCard}>
                            <View style={styles.questionHeader}>
                                <Text style={styles.qNumber}>{index + 1}.</Text>
                                <Text style={styles.qText}>{q.question}</Text>
                                {isCorrect ? (
                                    <Ionicons name="checkmark-circle" size={22} color="#34d399" />
                                ) : (
                                    <Ionicons name="close-circle" size={22} color="#ef4444" />
                                )}
                            </View>

                            {/* Options */}
                            <View style={{ marginTop: 8, gap: 6 }}>
                                {['A', 'B', 'C', 'D'].map((optKey) => {
                                    const optionText = q[`option_${optKey.toLowerCase()}` as keyof Question];
                                    const isUserMarked = item.marked_option === optKey;
                                    const isCorrectOption = q.correct_option === optKey;

                                    return (
                                        <View
                                            key={optKey}
                                            style={[
                                                styles.optionBox,
                                                isUserMarked && !isCorrectOption && styles.wrong,
                                                isCorrectOption && styles.correct,
                                                isUserMarked && isCorrectOption && styles.correctAndMarked,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    isUserMarked && styles.optionSelected,
                                                ]}
                                            >
                                                {optKey}. {optionText}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default QuizResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fc',
    },
    loading: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 40,
    },
    summaryBox: {
        backgroundColor: '#6f72df',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        marginTop: 4,
    },
    questionCard: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 14,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    qNumber: {
        fontWeight: '700',
        fontSize: 16,
        color: '#111',
    },
    qText: {
        flex: 1,
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    optionBox: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f3f4f6',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
    optionSelected: {
        fontWeight: '700',
    },
    correct: {
        backgroundColor: '#d1fae5',
        borderColor: '#10b981',
    },
    wrong: {
        backgroundColor: '#fee2e2',
        borderColor: '#ef4444',
    },
    correctAndMarked: {
        backgroundColor: '#bbf7d0',
    },
});
