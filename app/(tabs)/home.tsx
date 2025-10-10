
import Header from "@/components/Header";
import AssignmentComp from "@/components/ui/AssignmentComp";
import Quiz from "@/components/ui/Quiz";
import { useAppSelector } from "@/hooks/redux";
import supabase from "@/lib/supabase";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [latestQuizzes, setLatestQuizzes] = useState<any>([]);

  const router = useRouter();

  const fetchQuizzes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at',{ ascending: false })
      .limit(2);

    if (error) console.error('Error fetching quizzes:', error);
    else {
      setLatestQuizzes(data || []);
    }
    setLoading(false);
  }

  
  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const data = async () => {
      fetch("/api/test").then(res => res.json()).then(data => {
        console.log(data);
      });
    }
    data();
  }, []);
  return (
    <SafeAreaView>
      <Header />
      <View>
        <Text style={{fontFamily: "Poppins-Medium", paddingLeft:14}}>Hello, {user!.name}</Text>

        {/* <AssignmentComp/> */}

        <View>
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:14 }}>
            <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 20}}>Latest Quiz</Text>
            <Link href={"/quiz-home"}>
              <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 14, color:"#55555577"}}>See All</Text>
            </Link>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#111" style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={latestQuizzes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Quiz quizDetails={item}/>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              ListFooterComponent={<View style={{ marginBottom: 200 }} />}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {
                fetchQuizzes();
              }} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userProfileIcon: {
    width: 50,
    height: 50,
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 150,
    overflow: 'hidden',
    backgroundColor: "lightblue",
  }
});
