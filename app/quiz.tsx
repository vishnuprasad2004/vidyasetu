import QuizOption from "@/components/ui/QuizOption";
import { useAppSelector } from "@/hooks/redux";
import supabase from "@/lib/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


/**
 * {
      "id": "3bf69075-2c43-4d8a-b04f-019be09f511a",
      "hint": "Dalton’s atomic theory explained both the laws of conservation and constant proportions.",
      "quiz_id": "3f7c27e3-4247-4054-8f2e-ca5170614893",
      "option_a": "Antoine Lavoisier",
      "option_b": "John Dalton",
      "option_c": "Robert Boyle",
      "option_d": "J.J. Thomson",
      "question": "Which scientist proposed the Atomic Theory to explain laws of chemical combination?",
      "correct_option": "B"
    },
 */

interface Question {
  id: string;
  hint: string;
  question: string;
  quiz_id: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
}

interface QuizDetails {
  id: string;
  title: string;
  created_at: string;
  lang: string;
  subject: string;
  description: string;
  no_of_questions: number;
  time_required_minutes: number;
  questions: Question[];
}



const QuizScreen = () => {
  const user = useAppSelector((state) => state.auth.user)
  const params = useLocalSearchParams() ?? "";
  // console.log(params);

  const router = useRouter();

  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [quizDetails, setQuizDetails] = React.useState<QuizDetails | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0); // Track the current question
  const [answers, setAnswers] = React.useState<(string | null)[]>(Array(questions.length).fill(null));
  const [completed, setCompleted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(15 * 60); // 2 minutes in seconds
  const [loading, setLoading] = React.useState(true);
  // const currentQuestion = sampleQuestions[currentQuestionIndex];


  const fetchQuiz = async (quizId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select(
          `id, title, created_at, lang, subject, description, no_of_questions, time_required_minutes,
          questions ( id, question, option_a, option_b, option_c, option_d, correct_option, hint, quiz_id )`
        )
        .eq('id', quizId)
        .single();

      if (error) {
        console.log(error);
        Alert.alert("Error", "Could not fetch quiz data. Please try again later.");
        router.back();
      } else {
        console.log(JSON.stringify(data, null, 2));
        setQuizDetails(data);
        setTimeLeft((data.time_required_minutes ?? 10) * 60); // Set time based on quiz details, default to 1 minute if not available
        setQuestions(data.questions);
        setAnswers(Array(data.questions.length).fill(null)); // Initialize answers array based on number of questions
        setCurrentQuestionIndex(0); // Start from the first question
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong.");
      router.back();
    } finally {
      setLoading(false);
    }
  };
  // ✅ Check if quiz already completed
  useEffect(() => {
    if (!params.quizId || !user?.id) return;

    (async () => {
      const { data, error } = await supabase
        .from("quiz_result")
        .select(`
          id,
          user_id,
          marked_option,
          questions(
            id,
            quiz_id
          )
        `)
        .eq('quiz_id', params.quizId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching quiz results:", error);
        return;
      }

      console.log("is quiz completed", JSON.stringify(data, null, 2));

      if (data && data.length > 0 && data.some((item) => item.questions)) {
        setCompleted(true);
      }
    })();
  }, [params.quizId, user?.id]);
  useEffect(() => {
    fetchQuiz(params.quizId as string);
  }, [])

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      Alert.alert("Time's up!", "The quiz has ended.");
      setCompleted(true);
      // submitQuiz();
    }
  }, [timeLeft, loading]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // useEffect(() => {
  //   if (completed) return;
  //   const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
  //     goBack();
  //     return true;
  //   });
  //   return () => backHandler.remove();
  // }, [])
  const goBack = () => {
    Alert.alert(
      "Quit ?",
      "You can complete this quiz in a jiff, you sure you want to leave ?", [
      {
        text: "Cancel",
        onPress: () => { },
        style: "cancel"
      },
      {
        text: "Quit",
        onPress: () => {
          router.back();
        },
        style: "destructive"
      },
    ]);
  };

  const goToNextQuestion = () => {
    if (!selectedOption) {
      Alert.alert("Validation Error", "Please select an option before proceeding.");
      return;
    }

    const updatedAnswers = [...answers];
    console.log(currentQuestionIndex + " ," + selectedOption);

    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
    console.log(answers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      setAnswers(updatedAnswers);
      setCompleted(true);
      console.log(updatedAnswers);
      submitQuiz(updatedAnswers);
    }
  };


  const submitQuiz = async (answers: (string | null)[]) => {
    // Submit the answers and navigate to the results page
    // save answers to supabase
    const resultData = answers.map((answer, index) => ({
      question_id: questions[index].id,
      marked_option: answer,
      user_id: user?.id,
      quiz_id: params.quizId
    }))
    console.log("final answers", JSON.stringify(resultData, null, 2));
    const { data, error } = await supabase
      .from('quiz_result')
      .insert(resultData)
      .select()
    console.log(data);
    if (error) console.error('Error submitting quiz:', error);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null); // Restore the previous question's answer if it exists
    }
  };

  if (loading) {
    // Show a loading indicator while fetching data
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#6f72df" }}>
        <Text style={{ color: "#ffffff", fontSize: 18, fontFamily: "Poppins-Medium" }}>Loading Quiz...</Text>
      </SafeAreaView>
    );
  }

  // If the quiz is completed, show the results
  if (completed) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#6f72df", padding: 10 }}>
        {(questions.filter((q, index) => q.correct_option === answers[index]?.charAt(0)).length) / questions.length >= 0.7 && <LottieView
          source={require("../assets/animations/confettiAnimation.json")}
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
          loop={false}
          autoPlay
        />}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30, color: "#ffffffdd" }}>Quiz Completed!</Text>
          {/* <Text style={{ marginTop: 10, fontSize: 16, color: "#ffffffdd", fontFamily: "Poppins-Medium" }}>
            You got {questions.filter((q, index) => q.correct_option === answers[index]?.charAt(0)).length} out of {questions.length} correct !
          </Text> */}
          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: "#ffd097ee", padding: 12, paddingHorizontal: 32, borderRadius: 30, borderWidth: 1, borderColor: "#111111" }}
            onPress={() => { router.back() }}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 20, fontSize: 16, color: "#ffffffdd", fontFamily: "Poppins-Medium" }}>
            or
          </Text>
          <TouchableOpacity
            style={{ marginTop: 10, backgroundColor: "#ffd097ee", padding: 12, paddingHorizontal: 32, borderRadius: 30, borderWidth: 1, borderColor: "#111111" }}
            onPress={() => { router.push(`/quiz-results?quizId=${params?.quizId}`) }}
          >
            <Text>View Results</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }



  return (
    <SafeAreaView style={{ backgroundColor: "#6f72df", flex: 1, padding: 10 }}>

      {/* header */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>

        <TouchableOpacity style={{}} onPress={goBack}>
          <Ionicons name="chevron-back-circle-outline" size={40} color="#ffffffdd" />
        </TouchableOpacity>
        <Text style={styles.quizHeaderText}> {quizDetails?.subject} Quiz </Text>
        <Text>{"            "}</Text>

      </View>

      {/* quiz body */}
      <View style={{ padding: 10, flex: 1 }}>

        {/* timer */}
        <Text style={styles.time}>{formatTime(timeLeft)}</Text>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 1, marginTop: 10 }}>
              <Text style={{ fontSize: 18, color: "#ffffffdd", fontFamily: "Poppins-SemiBold" }}>{`${currentQuestionIndex + 1}.`}</Text>
              <Text style={{ fontSize: 12, color: "#ffffffaa", fontFamily: "Poppins-Medium" }}>{currentQuestionIndex + 1}/{questions.length}</Text>
            </View>
            {/* Question */}
            <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>

            {/* options */}
            <View style={{ marginTop: 10, gap: 20 }}>
              <Text style={{ fontSize: 14, color: "#ffffffaa" }}>Choose your answer</Text>

              {/* {currentQuestion.options.map((option, index) => (
              ))} */}
              <QuizOption
                key={questions[currentQuestionIndex].option_a}
                text={"A. " + questions[currentQuestionIndex].option_a}
                isSelected={selectedOption === 'A'}
                onPress={() => setSelectedOption('A')}
              />
              <QuizOption
                key={questions[currentQuestionIndex].option_b}
                text={"B. " + questions[currentQuestionIndex].option_b}
                isSelected={selectedOption === 'B'}
                onPress={() => setSelectedOption('B')}
              />
              <QuizOption
                key={questions[currentQuestionIndex].option_c}
                text={"C. " + questions[currentQuestionIndex].option_c}
                isSelected={selectedOption === 'C'}
                onPress={() => setSelectedOption('C')}
              />
              <QuizOption
                key={questions[currentQuestionIndex].option_d}
                text={"D. " + questions[currentQuestionIndex].option_d}
                isSelected={selectedOption === 'D'}
                onPress={() => setSelectedOption('D')}
              />
            </View>

            {/* submit section */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 40, marginBottom: 20, alignItems: "center", gap: 10 }}>

              <TouchableOpacity
                style={styles.previousButton}
                activeOpacity={1}
                onPress={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0} // Disable if on the first question
              >
                <Ionicons name="chevron-back" size={40} color="#ffffffdd" />
                <Text style={{ color: "#ffffffdd", fontFamily: "Poppins-Medium" }}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.hintButton} activeOpacity={1} onPress={() => {
                Alert.alert("Hint", questions[currentQuestionIndex].hint);
              }}>
                <Ionicons name="bulb-outline" size={24} color="#ededed" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.nextButton}
                activeOpacity={1}
                onPress={goToNextQuestion}
              >
                <Text style={{ color: "#111111dd", fontFamily: "Poppins-Medium" }}>{currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}</Text>
                <Ionicons name="chevron-back" size={40} color="#111111dd" style={{ transform: [{ rotateZ: "180deg" }] }} />
              </TouchableOpacity>

            </View>

            <View style={{ marginBottom: 30 }}></View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  quizHeaderText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  question: {
    color: "#ffffffee",
    fontSize: 22,
    fontFamily: "Poppins-Bold",
  },
  time: {
    color: "#111111",
    alignSelf: "flex-end",
    fontSize: 14,
    padding: 4,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: "#111111",
    borderRadius: 100,
    // marginVertical: 4,
    fontFamily: "Poppins-Medium",
    backgroundColor: "#ffd097ee"
  },
  nextButton: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 6, width: "37%", backgroundColor: "#ffffffee", borderRadius: 20, alignSelf: "flex-end", paddingLeft: 20 },
  previousButton: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, padding: 6, width: "37%", borderColor: "#ffffffdd", borderRadius: 20, alignSelf: "flex-start", paddingRight: 20 },
  hintButton: { padding: 12, borderRadius: 100, backgroundColor: "#ffffff22", borderWidth: 1, borderColor: "#ffffff55" },
});