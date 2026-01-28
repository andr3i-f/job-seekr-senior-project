import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body || !("skills" in body)) {
    return NextResponse.json(
      { error: "'skills' list is missing from body!" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .update({ skills: body["skills"] })
    .eq("auth_user_fk", user.id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update 'skills' section" },
      { status: 500 },
    );
  }

  return NextResponse.json({ skills: data }, { status: 200 });
}
