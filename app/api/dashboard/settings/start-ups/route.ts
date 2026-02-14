import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body || !("startUps" in body)) {
    return NextResponse.json(
      { error: "'startUps' is missing from body!" },
      { status: 400 },
    );
  }

  if (body["startUps"] !== null && typeof body["startUps"] !== "boolean") {
    return NextResponse.json(
      { error: "'startUps' is incorrect type!" },
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

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("auth_user_fk", user.id)
    .single();

  const { data, error } = await supabase
    .from("user_settings")
    .update({ start_ups: body["startUps"] })
    .eq("user_profile_fk", profile!.id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update 'startUps' section" },
      { status: 500 },
    );
  }

  return NextResponse.json({ startUps: data }, { status: 200 });
}
