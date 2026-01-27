"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function login() {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/auth/callback",
    },
  });

  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function gatherJwtFromSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  return data?.session?.access_token;
}

export async function getUserInfo(): Promise<null | User> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data?.user;
}
