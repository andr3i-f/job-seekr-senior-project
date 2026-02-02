"use server";

import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

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

export async function getUserInfo(): Promise<User | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data?.user;
}
