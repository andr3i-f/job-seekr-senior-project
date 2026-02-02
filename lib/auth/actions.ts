"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";
import { CredentialResponse } from "@react-oauth/google";

export async function handleSignInWithGoogle(response: CredentialResponse) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });

  if (error) {
    redirect("/404");
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
