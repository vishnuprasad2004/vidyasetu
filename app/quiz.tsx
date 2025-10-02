import QuizOption from "@/components/ui/QuizOption";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

const sampleQuestions = [
  {
    question: "If Rani has 10 apples and Shyam has 12 apples, what is the radius of the sun ?",
    options: [
      "A. 696,340 km",
      "B. 1,392,700 km",
      "C. 149.6 million km",
      "D. 0 km"
    ],
    answer: "A"
  },
  {
    question: "चूंकि मानव अधिकारों के प्रति उपेक्षा और घृणा के फलस्वरूप ही ऐसे बर्बर कार्य हुए जिनसे मनुष्य",
    options: [
      "A. 696,340 km",
      "B. 1,392,700 km",
      "C. 149.6 million km",
      "D. 0 km"
    ],
    answer: "A"
  },
  {
    question: "What is the capital of France?",
    options: [
      "A. Berlin",
      "B. Madrid",
      "C. Paris",
      "D. Rome"
    ],
    answer: "C"
  },
  {
    question: "What is 2 + 2?",
    options: [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 22"
    ],
    answer: "B"
  }
];



const QuizScreen = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0); // Track the current question
  const [answers, setAnswers] = React.useState<(string | null)[]>(Array(sampleQuestions.length).fill(null));
  const [completed, setCompleted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(120); // 2 minutes in seconds

  const currentQuestion = sampleQuestions[currentQuestionIndex];


  // React.useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //     return () => clearTimeout(timer);
  //   } else {
  //     Alert.alert("Time's up!", "The quiz has ended.");
  //     setCompleted(true);
  //     // submitQuiz();
  //   }
  // }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const goBack = () => {
    Alert.alert(
      "Quit ?", 
      "You can complete this quiz in a jiff, you sure you want to leave ?", [
      {
        text: "Cancel",
        onPress: () => {},
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
    console.log(currentQuestionIndex +  " ," + selectedOption);
    
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
    console.log(answers);

    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      setCompleted(true);
      console.log(answers);
      

      // submitQuiz();
    }
  };


  const submitQuiz = () => {
    
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null); // Restore the previous question's answer if it exists
    }
  };


  // If the quiz is completed, show the results
  if (completed) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#6f72df", padding:10 }}>
        {(sampleQuestions.filter((q, index) => q.answer === answers[index]?.charAt(0)).length)/sampleQuestions.length >= 0.7 && <LottieView 
          source={require("../assets/animations/confettiAnimation.json")} 
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
          loop={false}
          autoPlay
        />}
        <View style={{ flex:1, justifyContent: "center", alignItems: "center", gap: 10 }}>
          <Text style={{fontFamily: "Poppins-Bold", fontSize: 30, color:"#ffffffdd"}}>Quiz Completed!</Text>
          <Text style={{ marginTop: 10, fontSize: 16, color: "#ffffffdd", fontFamily: "Poppins-Medium" }}>
            You got {sampleQuestions.filter((q, index) => q.answer === answers[index]?.charAt(0)).length} out of {sampleQuestions.length} correct !
          </Text>
          <TouchableOpacity 
            style={{ marginTop: 20, backgroundColor: "#ffd097ee", padding: 12, paddingHorizontal: 32, borderRadius: 30, borderWidth: 1, borderColor: "#111111" }}
            onPress={() => {router.back()}}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }



  return (
    <SafeAreaView style={{ backgroundColor: "#6f72df", flex: 1, padding:10}}>

      {/* header */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>

        <TouchableOpacity style={{ }} onPress={goBack}>
          <Ionicons name="chevron-back-circle-outline" size={40} color="#ffffffdd" />
        </TouchableOpacity>
        <Text style={styles.quizHeaderText}> Mathematics Quiz </Text>
        <Text>{"            "}</Text>

      </View>

      {/* quiz body */}
      <View style={{ padding: 10, flex:1 }}>

        {/* timer */}
        <Text style={styles.time}>{formatTime(timeLeft)}</Text>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between", gap: 1, marginTop:10 }}>
              <Text style={{fontSize:18, color: "#ffffffdd", fontFamily: "Poppins-SemiBold"}}>{`${currentQuestionIndex + 1}.`}</Text>
              <Text style={{fontSize:12, color: "#ffffffaa", fontFamily: "Poppins-Medium"}}>{currentQuestionIndex + 1}/{sampleQuestions.length}</Text>
            </View>
            {/* Question */}
            <Text style={styles.question}>{currentQuestion.question}</Text>

            {/* options */}
            <View style={{marginTop: 10, gap: 20}}>
              <Text style={{ fontSize: 14, color:"#ffffffaa"}}>Choose your answer</Text>
            
              {currentQuestion.options.map((option, index) => (
                <QuizOption
                  key={index}
                  text={option}
                  isSelected={selectedOption === option}
                  onPress={() => setSelectedOption(option)}
                />
              ))}
            </View>

            {/* submit section */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 40, marginBottom: 20 }}>

              <TouchableOpacity 
                style={styles.previousButton} 
                activeOpacity={1}
                onPress={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0} // Disable if on the first question
              >
                <Ionicons name="chevron-back" size={40} color="#ffffffdd" />
                <Text style={{ color:"#ffffffdd", fontFamily: "Poppins-Medium" }}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.nextButton} 
                activeOpacity={1}
                onPress={goToNextQuestion}
              >
                <Text style={{ color:"#111111dd", fontFamily: "Poppins-Medium" }}>{currentQuestionIndex === sampleQuestions.length - 1 ? "Submit" : "Next"}</Text>
                <Ionicons name="chevron-back" size={40} color="#111111dd" style={{transform:[{rotateZ:"180deg"}]}}/>
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
    backgroundColor:"#ffd097ee"
  },
  nextButton: { flexDirection:"row", justifyContent:"space-between", alignItems: "center", padding:8, width:"45%", backgroundColor:"#ffffffee", borderRadius:20, alignSelf:"flex-end", paddingLeft:20 },
  previousButton: { flexDirection:"row", justifyContent:"space-between", alignItems: "center", borderWidth:1, padding:8, width:"45%", borderColor:"#ffffffdd", borderRadius:20, alignSelf:"flex-start", paddingRight:20 }
});