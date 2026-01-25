"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

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

export async function gather_jwt_from_session() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  console.log(data)
  return data?.session?.access_token
}