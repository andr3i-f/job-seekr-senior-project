"use server";

import { UserInfo } from "@/constants/types";
import { createClient } from "@/lib/supabase/server";

export async function handleSignInWithGoogle(credential: string | undefined) {
  if (credential === undefined) {
    throw new Error("Unable to retrieve credential from Google response.");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: credential,
  });

  if (error) {
    throw new Error(`Failed to sign in with Google: ${error.message}`);
  }
}

export async function gatherJwtFromSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  return data?.session?.access_token;
}

export async function handleSignOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Failed to sign out: ${error.message}`);
  }
}

export async function getUserInfo(): Promise<UserInfo | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: adminInfo } = await supabase
    .from("user_profiles")
    .select("admin")
    .single();

  if (data.user === null) {
    return null;
  }

  return { ...data?.user, admin: adminInfo?.admin as boolean };
}
