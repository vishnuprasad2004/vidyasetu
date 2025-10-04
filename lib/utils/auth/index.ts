import supabase from "@/lib/supabase";

export const socialGoogleAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "vidyasetu://login",
      skipBrowserRedirect: true,
    },
  });
};
