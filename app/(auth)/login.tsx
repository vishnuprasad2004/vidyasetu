import supabase from '@/lib/supabase'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { Button, ToastAndroid, View } from 'react-native'

WebBrowser.maybeCompleteAuthSession() // required for web only
const redirectTo = makeRedirectUri()

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params

  if (!access_token) return

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  return data.session
}

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: "vidyasetu://login",
      skipBrowserRedirect: true,
    },
  })
  if (error) throw error

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    const { url } = res
    await createSessionFromUrl(url)
    ToastAndroid.show('Login successful', ToastAndroid.LONG)
  }
}


export default function Auth() {
  // Handle linking into app from email app.
  const url = Linking.useURL()
  if (url) createSessionFromUrl(url)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={performOAuth} title="Sign in with Google"
        color={"#222"}
      />
    </View>
  )
}