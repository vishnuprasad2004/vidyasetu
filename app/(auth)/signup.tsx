import supabase from '@/lib/supabase';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { performOAuth } from './login';

const SignupScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const handelEmailSignUp = async () => {
    setLoading(true)
    if (!email || !password || !name) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.LONG)
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })
    console.log(data)
    console.log(error)
    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG)
    }
    if (data.user) {
      ToastAndroid.show("User created successfully", ToastAndroid.LONG)
      setLoading(false)
      router.push('/login')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Ionicons name="chevron-back-circle-outline" size={36} color="grey"
              onPress={() => router.back()}
            />
          </View>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Sign up to continue your learning journey</Text>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: '#a2d2ff', borderWidth: 1 }]}
              onPress={performOAuth}
            >
              <AntDesign name="google" size={20} color="#000" />
              <Text style={styles.socialText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { borderColor: '#a2d2ff', borderWidth: 1 }]}
            >
              <FontAwesome name="facebook" size={20} color="#000" />
              <Text style={styles.socialText}>Sign up with Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.signupButton}
            onPress={handelEmailSignUp}
          >
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.signupText}>Sign Up</Text>}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Medium',
    marginBottom: 30,
  },
  socialContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 10,
  },
  socialText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  signupButton: {
    backgroundColor: '#6f72df',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#444',
    fontSize: 15,
  },
  footerLink: {
    color: '#6f72df',
    fontWeight: '700',
    fontSize: 15,
  },
});
